"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 

interface Product {
  id: number;
  Name: string;
  Description: string;
  Stock: number;
  Price: number;
  Images: string[];
  Category_ID:number;
}

export function useProduct(id: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Products")
        .select("id, Name, Description, Stock, Price, Images,Category_ID")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data as Product);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
