"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  Name: string;
  Description: string;
  Price: number;
  Images: string[];
  Discount: number;
}

export function useSuggestion(
  productId: number | null = null,
  categoryId: number | null = null
) {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("Products")
          .select(
            `
            id,
            Name,
            Description,
            Price,
            Discount,
            Colors_Image!inner (
              Images,
              Default
            )
          `
          );

        if (categoryId != null) {
          console.log("Category and product id in the Suggestion hook", categoryId, productId);
          query = query
            .eq("Category_ID", categoryId)
            .neq("id", productId)
            .eq("Colors_Image.Default", true)
            .limit(7);
        } else {
          console.log("Category and product id in the Suggestion hook", categoryId, productId);
          query = query
            .order("Price", { ascending: true })
            .eq("Colors_Image.Default", true)
            .limit(7);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching product suggestions", error);
          setError(error.message);
          return;
        }

        console.log("Data from the Db is", data);

        const productsWithImage = (data || []).map((prod: any) => ({
          id: prod.id,
          Name: prod.Name,
          Description: prod.Description,
          Price: prod.Price,
          Discount: prod.Discount,
          Images: prod.Colors_Image?.[0]?.Images || [],
        }));

        console.log("Products after destructuring is", productsWithImage);
        setSuggestedProducts(productsWithImage as Product[]);
      } catch (err: any) {
        setError(err.message || "Unexpected error while fetching suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [productId, categoryId]);

  return { suggestedProducts, error, loading };
}
