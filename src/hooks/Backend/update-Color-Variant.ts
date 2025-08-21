import { supabase } from "@/lib/supabaseClient";

export async function updateColorVariant(
  productId: number,
  color: {
    id: number;
    name: string;
    stock: number;
    images: (string | File)[]; // can be existing paths (string) or new files
  }
) {
  try {
    // 1. Fetch old images for this color
    const { data: existing, error: fetchError } = await supabase
      .from("Colors_Image")
      .select("Images")
      .eq("Product_Id", productId)
      .eq("id", color.id)
      .single();

    if (fetchError) throw fetchError;

    const oldImages: string[] = existing?.Images || [];

    // 2. Split current images into "existing paths" and "new files"
    const existingImages = color.images.filter(
      (img): img is string => typeof img === "string"
    );
    const newFiles = color.images.filter(
      (img): img is File => img instanceof File
    );

    // 3. Find which old images were removed by the user
    const removedImages = oldImages.filter(
      (old) => !existingImages.includes(old)
    );

    // 4. Delete only removed images from bucket
    if (removedImages.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from("Product_Images") // ✅ bucket name matches
        .remove(removedImages);
      if (deleteError) throw deleteError;
    }

    // 5. Upload new files
    const uploadedPaths: string[] = [];
    for (const file of newFiles) {
      const filePath = `product-${productId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("Product_Images") // ✅ bucket name matches
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      uploadedPaths.push(filePath);
    }

    // 6. Final images = kept old ones + newly uploaded ones
    const finalImages = [...existingImages, ...uploadedPaths];

    // 7. Update DB
    const { error: updateError } = await supabase
      .from("Colors_Image")
      .update({
        Color: color.name,        // ✅ column name matches schema
        Images: finalImages,      // ✅ Images is array of text
        Stock: color.stock,       // ❓ schema doesn’t show stock in Colors_Image (only in Products)
      })
      .eq("id", color.id)
      .eq("Product_Id", productId);

    if (updateError) throw updateError;

    return { success: true, color: { ...color, images: finalImages } };
  } catch (err) {
    console.error("Error updating color variant:", err);
    return { success: false, error: err };
  }
}



// ✅ Add Color Variant (Colors_Image row)
export const addColorVariant = async (
  productId: number,
  color: string,
  stock:number,
  images: File[]
) => {
  if (images.length === 0) return ;

  const uploadedPaths: string[] = [];

  // Step 1: Upload images first
  for (const img of images) {
    const filePath = `product-${productId}/${Date.now()}-${img.name}`;
    const { error: uploadError } = await supabase.storage
      .from("Product_Images") // ✅ bucket name from your schema
      .upload(filePath, img);

    if (uploadError) throw uploadError;

    uploadedPaths.push(filePath);
  }

  // Step 2: Insert new Colors_Image row with image paths
  const { data, error } = await supabase
    .from("Colors_Image")
    .insert([
      {
        Product_Id: productId,
        Color: color,
        Images: uploadedPaths, // ✅ stored directly in Images column
        Stock:stock
      },
    ])
    .select("id")
    .single();

  if (error) throw error;

  return { type: "addition", variantId: data.id, images: uploadedPaths };
};

// ✅ Delete Color Variant (with bucket cleanup)
export const deleteColorVariant = async (
  productId: number,
  variantId: number
) => {
  // Step 1: Get existing images for this variant
  const { data: existing, error: fetchError } = await supabase
    .from("Colors_Image")
    .select("Images")
    .eq("id", variantId)
    .eq("Product_Id", productId)
    .single();

  if (fetchError) return ;

  const oldImages: string[] = existing?.Images || [];

  // Step 2: Delete images from storage bucket
  if (oldImages.length > 0) {
    const { error: deleteError } = await supabase.storage
      .from("Product_Images")
      .remove(oldImages);

    if (deleteError) return;
  }

  // Step 3: Delete row from Colors_Image table
  const { error: dbError } = await supabase
    .from("Colors_Image")
    .delete()
    .eq("id", variantId)
    .eq("Product_Id", productId);

  if (dbError) return;

  return { type: "deletion", variantId };
};

