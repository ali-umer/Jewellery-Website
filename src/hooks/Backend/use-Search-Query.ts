"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  Name: string;
  Image: string | null; // single default image
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("Products")
          .select(
            `
              id,
              Name,
              Colors_Image!inner (
                Images,
                Default
              )
            `
          )
          .ilike("Name", `%${query}%`)
          .eq("Colors_Image.Default", true)
          .abortSignal(controller.signal as AbortSignal);

        if (error) throw error;

        const mapped: Product[] = (data ?? []).map(
          (item: { id: number; Name: string; Colors_Image?: { Images: string }[] }) => ({
            id: item.id,
            Name: item.Name,
            Image: item.Colors_Image?.[0]?.Images || null,
          })
        );

        if (!controller.signal.aborted) setResults(mapped);
      } catch (err: any) {
        if (err?.name === "AbortError") return; // ignore aborted requests
        setError(err?.message ?? "Something went wrong");
        setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { results, loading, error };
}
