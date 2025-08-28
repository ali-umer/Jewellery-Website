"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: number;
  Name: string;
  Price: number;
  Discount:number;
  Description: string;
  Images: string[];
};


export function useCategoryProducts(category: string, pageSize: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const abortRef = useRef<AbortController | null>(null);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    // cancel any previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

     const{data:Category,error:CategoroyError} = await supabase
                              .from("Category")
                              .select("id")
                              .eq("Name", category)
                              .limit(1);


                    if(CategoroyError){
                     
                      setLoading(false);
                      return;
                    }

    const from = (pageRef.current - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("Products")
      .select(
        `
        id,
        Name,
        Price,
        Discount,
        Description,
        Colors_Image:Colors_Image!inner (
          Images,
          Default
        )
        `
      )
      .eq("Category_ID", Category[0].id)
      .eq("Colors_Image.Default", true)
      .range(from, to)
      .abortSignal(controller.signal); // 👈 pass abort signal

    if (error) {
      if (error.name !== "AbortError") {
       
      }
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const mapped = data.map((p: any): Product => ({
        id: p.id,
        Name: p.Name,
        Price: p.Price,
        Description: p.Description,
        Discount: p.Discount,
        Images: p.Colors_Image?.map((c: any) => c.Images).flat() || [],
      }));

      // prevent duplicates by ID
      setProducts((prev) => {
        const existing = new Set(prev.map((p) => p.id));
        const newOnes = mapped.filter((p) => !existing.has(p.id));
        return [...prev, ...newOnes];
      });

      pageRef.current += 1;

      if (data.length < pageSize) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setLoading(false);
  }, [category, hasMore, loading, pageSize]);

  // Reset when category changes
  useEffect(() => {
    // cancel any ongoing request on category change
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setProducts([]);
    setHasMore(true);
    setLoading(false);
    pageRef.current = 1;
  }, [category]);

  return {
    products,
    loading,
    hasMore,
    getMore: fetchProducts,
  };
}




