"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ColorCombination {
  color: string;
  image_url: string;
}

interface UseProductControllerProps {
  product_id: number;
}

export default function useProductController({ product_id }: UseProductControllerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [productVariants, setProductVariants] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVariants = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("Colors-Image")
        .select("Color, Images")
        .eq("Product_Id", product_id);

      const variants: Record<string, string[]> = {};

      (data as { Color: string; Images: string }[]).forEach(({ Color, Images }) => {
        if (!variants[Color]) variants[Color] = [];
        variants[Color].push(Images);
      });

      const defaultColor = Object.keys(variants)[0] ?? "";
      setProductVariants(variants);
      setSelectedColor(defaultColor);
      setActiveImages(variants[defaultColor] ?? []);
      console.log(data);
      setIsLoading(false); 
    };

    fetchVariants();
  }, [product_id]);

  useEffect(() => {
    setActiveImages(productVariants[selectedColor] ?? []);
  }, [selectedColor, productVariants]);

  const colors = Object.keys(productVariants);

  return {
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    setActiveImages,
    activeImages,
    colors,
    isLoading,
  };
}
