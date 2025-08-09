// hooks/useQuickViewController.ts
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UseProductControllerProps {
  product_id: number;
}

interface VariantData {
  Color: string;
  Images: string[];
}

export default function useProductController({ product_id }: UseProductControllerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [productVariants, setProductVariants] = useState<Record<string, string[]>>({});
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleColorChange(color: string = Object.keys(productVariants)[0]) {
    setActiveColor(color);
    setActiveImages(productVariants[color] ?? []);
  }

  useEffect(() => {
    const fetchVariants = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("Colors_Image")
        .select("Color, Images")
        .eq("Product_Id", product_id);

      if (error) {
        console.error("Error fetching variants:", error);
        setIsLoading(false);
        return;
      }

      const variants: Record<string, string[]> = {};
      
      data.forEach(({ Color, Images }) => {
        if (Array.isArray(Images)) {
          variants[Color] = Images;
        } 
       
      });

      setProductVariants(variants);
      const colors = Object.keys(variants);
      setActiveColor(colors[0] || "");
      setActiveImages(variants[colors[0]] || []);
      setIsLoading(false);
    };

    fetchVariants();
  }, [product_id]);

  const colors= Object.keys(productVariants);
  return {
    quantity,
    setQuantity,
    colors,
    activeColor,
    setActiveColor: handleColorChange,
    activeImages,
    isLoading,
  };
}