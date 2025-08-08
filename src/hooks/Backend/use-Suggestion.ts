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
  Category_ID: number;
}

export function useSuggestion(productId: number | null = null, categoryId: number | null = null) {
  console.log("Error Product Suggestions not found");
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
 
  useEffect(() => { 
      const fetchSuggestions = async () => {
          let query = supabase
          .from("Products")
          .select("id, Name, Description, Stock, Price, Images, Category_ID");
          
          if (categoryId != null ) { // when no things provide to you, it's an indicator to do Top Selling
            console.log("Category and product id in the Suggestion hook",categoryId,productId);
            query = query.eq("Category_ID", categoryId).neq("id", productId).limit(7); 
      } 
      else {
         console.log("Category and product id in the Suggestion hook",categoryId,productId);
         query = query.order("Price", { ascending: true }).limit(7);
      }

      const { data, error } = await query;

      if (error) {
        console.log("Error Product Suggestions not found");
        return;
      }

      setSuggestedProducts(data as Product[]);
    };

    fetchSuggestions();
  }, [productId,categoryId]);

   return suggestedProducts;
}
