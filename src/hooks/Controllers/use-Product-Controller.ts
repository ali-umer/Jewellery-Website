"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UseProductControllerProps {
  product_id: number;
  type: "QuickView" | "ProductPage";
}

interface Product {
  name: string;
  price: number;
  description: string;
  discount: number;
  categoryId: number;
}

export default function useProductController({ product_id, type }: UseProductControllerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [productVariants, setProductVariants] = useState<Record<string, string[]>>({});
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();

  function handleColorChange(color: string = Object.keys(productVariants)[0]) {
    setActiveColor(color);
    setActiveImages(productVariants[color] ?? []);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (type === "QuickView") {
      
        const { data, error } = await supabase
          .from("Colors_Image")
          .select("Color, Images")
          .eq("Product_Id", product_id);

        if (error) {
          console.error("Error fetching quick view data:", error);
          setIsLoading(false);
          return;
        }

        const variants: Record<string, string[]> = {};
        data.forEach(({ Color, Images }: { Color: string; Images: string[] }) => {
          if (Array.isArray(Images)) {
            variants[Color] = Images;
          }
        });

        setProductVariants(variants);
        const colors = Object.keys(variants);
        setActiveColor(colors[0] || "");
        setActiveImages(variants[colors[0]] || []);

      } else if (type === "ProductPage") {
        // ✅ Full query: Product + Variants
        const { data, error } = await supabase
          .from("Products")
          .select(`
            Name,
            Description,
            Price,
            Discount,
            Category_ID,
            Colors_Image (
              Color,
              Images
            )
          `)
          .eq("id", product_id)
          .single();

        if (error) {
          console.error("Error fetching product page data:", error);
          setIsLoading(false);
          return;
        }

        const fetchedProduct: Product = {  name: data.Name,price: data.Price, description: data.Description, discount: data.Discount ?? 0,
          categoryId: data.Category_ID
        };
        setProduct(fetchedProduct);

      
        const variants: Record<string, string[]> = {};
        data.Colors_Image.forEach(({ Color, Images }: { Color: string; Images: string[] }) => {
          if (Array.isArray(Images)) {
            variants[Color] = Images;
          }
        });

        setProductVariants(variants);
        const colors = Object.keys(variants);
        setActiveColor(colors[0] || "");
        setActiveImages(variants[colors[0]] || []);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [product_id, type]);

  const colors = Object.keys(productVariants);

  return {
    quantity,
    setQuantity,
    colors,
    activeColor,
    setActiveColor: handleColorChange,
    activeImages,
    isLoading,
    product
  };
}
