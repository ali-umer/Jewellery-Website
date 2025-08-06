"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: number;
  Name: string;
  Price: number;
  Description: string;
  Images: string[];
};

export function useCategoryProducts(categoryId: number, pageSize: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1); 

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const from = (pageRef.current - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
                                .from("Products")
                                .select("*")
                                .eq("Category_ID", categoryId)
                                .range(from, to);

    if (error) {
    setLoading(false);
    return;
    }

    if (data && data.length > 0) {
      setProducts((prev) => [...prev, ...data]);
      pageRef.current += 1;
    }
      
    if (data.length < pageSize) {
        setHasMore(false); 
    }

    setLoading(false);
 }, [categoryId,hasMore, loading]);


  useEffect(() => {
                setProducts([]);
                setHasMore(true);
                setLoading(false);
                pageRef.current = 1;
            },[categoryId]);

   
            

  return {
    products,
    loading,
    hasMore,
    getMore: fetchProducts,
  };
}





