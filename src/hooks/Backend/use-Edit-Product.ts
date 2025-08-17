"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useEditProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);

  // 1. Fetch product details
  const getProduct = async (productId: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("Products")
        .select("*")
        .eq("id", productId)
        .single();

      if (fetchError) throw fetchError;
      console.log(data);
      setProduct(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2. Update product details
  const updateProduct = async (productId: number, updates: any) => {
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from("Products")
        .update(updates)
        .eq("id", productId);

      if (updateError) throw updateError;

      // Refresh product state after update
      await getProduct(productId);

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { product, getProduct, updateProduct, loading, error };
}
