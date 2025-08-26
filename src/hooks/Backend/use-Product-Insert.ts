"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";


export function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // Call RPC to add product
  const addProduct = async (productData: {
    name: string;
    price: number;
    description: string;
    discount: number;
    categoryName: string;
  }) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const { data: productId, error: rpcError } = await supabase.rpc(
        "insert_product_details",
        {
          p_name: productData.name,
          p_price: productData.price,
          p_description: productData.description,
          p_discount: productData.discount,
          p_category_name: productData.categoryName,
        }
      );

      if (rpcError) throw rpcError;

      setData(productId);
      return Number(productId);
    } catch (err: any) {
      setError(err.message || "Failed to insert product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload images -> get URLs -> call RPC to insert colors
  const insertColorWithImages = async (
    productId: number,
    colors: {
      Color: string;
      Images: File[];
    }[]
  ) => {
    setLoading(true);
    setError(null);

    try {
      for (const [index, color] of colors.entries()) {
        if (!color.Images || color.Images.length === 0) continue;

        const imageUrls: string[] = [];
        const folderName = `product-${productId}`;

        for (const file of color.Images) {
          const fileName = `${folderName}/img-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 9)}-${file.name.replace(/\s+/g, "-")}`;

          const { error: uploadError } = await supabase.storage
            .from("Product_Images")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("Product_Images")
            .getPublicUrl(fileName);

          imageUrls.push(publicUrl);
        }

        const { error: rpcError } = await supabase.rpc("insert_color_with_images", {
          p_product_id: productId,
          p_color: color.Color,
          p_images: imageUrls,
          p_is_default: index === 0, // first color default
        });

        if (rpcError) throw rpcError;
      }
    } catch (err: any) {
      setError(err.message || "Failed to insert colors with images");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, insertColorWithImages, loading, error, data };
}
