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
      .select(`
        id,
        Name,
        Description,
        Stock,
        Price,
        Category_ID,
        Colors_Image!inner (
          Images
        )
      `);

    if (categoryId != null) {
      console.log("Category and product id in the Suggestion hook", categoryId, productId);
      query = query
        .eq("Category_ID", categoryId)
        .neq("id", productId)
        .eq("Colors_Image.Default", true) // only default images
        .limit(7);
    } else {
      console.log("Category and product id in the Suggestion hook", categoryId, productId);
      query = query
        .order("Price", { ascending: true })
        .eq("Colors_Image.Default", true) // only default images
        .limit(7);
    }

    const { data, error } = await query;
    
    if (error) {
      console.log("Error Product Suggestions not found", error.message);
      return;
    }
    
    console.log("Data from the Db is" ,data);
    // Flatten so each product has its default image directly in the object
    const productsWithImage = (data || []).map((prod: any) => ({
      id: prod.id,
      Name: prod.Name,
      Description: prod.Description,
      Stock: prod.Stock,
      Price: prod.Price,
      Category_ID: prod.Category_ID,
      Images:prod.Colors_Image?.[0]?.Images || []

    }));
 
  console.log("Products after destructuring is",productsWithImage);
    setSuggestedProducts(productsWithImage as Product[]);
  };



  fetchSuggestions();
 
}, [productId, categoryId]);


   return suggestedProducts;
}
