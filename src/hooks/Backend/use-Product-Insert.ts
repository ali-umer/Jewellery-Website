"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // Function to add a product
  const addProduct = async (productData: {
    name: string;
    price: number;
    description: string;
    categoryName: string;
    discount:number;
  }) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Get category ID
      const { data: category, error: categoryError } = await supabase
        .from("Category")
        .select("id")
        .eq("Name", productData.categoryName)
        .single();

      if (categoryError) throw categoryError;
      if (!category) throw new Error("Category not found");

      // Insert product
      const { data: insertedProduct, error: insertError } = await supabase
        .from("Products")
        .insert({
          Name: productData.name,
          Price: productData.price,
          Description: productData.description,
          Discount:productData.discount,
          Category_ID: category.id
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      setData(insertedProduct);
      return insertedProduct.id; // Return the product ID for further use
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err; // Re-throw the error to handle it in the component
    } finally {
      setLoading(false);
    }
  };

  // Separate function to insert colors with images
const insertColorsWithImages = async (
  productId: number,
  colors: {
    Color: string;
    Images: File[];
  }[]
) => {
  setLoading(true);
  setError(null);

  try {
    for (const color of colors) {
      if (!color.Images || color.Images.length === 0) continue;

      const imageUrls: string[] = [];
      const folderName = `product-${productId}`; // folder per product

      for (const file of color.Images) {
        const fileName = `${folderName}/img-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}-${file.name.replace(/\s+/g, "-")}`;

        const { error: uploadError } = await supabase.storage
          .from("Product_Images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = await supabase.storage
          .from("Product_Images")
          .getPublicUrl(fileName);

        imageUrls.push(publicUrl);
      }

      const isDefault = colors[0] === color;

      const { error: insertError } = await supabase
        .from("Colors_Image")
        .insert({
          Color: color.Color,
          Product_Id: productId,
          Images: imageUrls,
          Default: isDefault
        });

      if (insertError) throw insertError;
    }


  } 
  catch (err: any) {
    setError(err.message || "Failed to add colors and images");
    throw err;
  } finally {
    setLoading(false);
  }
};


  return { addProduct, insertColorsWithImages, loading, error, data };
}