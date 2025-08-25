"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Category {
  id: string;
  Name: string;
  Image: string;
}

export function useCategoryController() {
  const [Category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("Category")
                .select("Name,Image");

      if (error) {
        setError(error.message);
        setCategory([]);
      } else if (data) {
        setCategory(data as Category[]);
        console.log(data);
      }
      setLoading(false);
    };

    fetchCategory();
  }, []);

  return { Category, loading, error };
}
