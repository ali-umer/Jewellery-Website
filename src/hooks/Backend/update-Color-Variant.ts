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
      if (deleteError)  return false;
    }

    // 5. Upload new files
    // 5. Upload new files
const uploadedUrls: string[] = [];
for (const file of newFiles) {
  const filePath = `product-${productId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("Product_Images")
    .upload(filePath, file);

  if (uploadError) return false;

  // ✅ Get the public URL instead of storing filePath
  const { data } = supabase.storage
    .from("Product_Images")
    .getPublicUrl(filePath);

  if (data?.publicUrl) {
    uploadedUrls.push(data.publicUrl);
  }
}


    // 6. Final images = kept old ones + newly uploaded ones
  // 6. Final images = kept old ones + newly uploaded public URLs
const finalImages = [...existingImages, ...uploadedUrls];

// 7. Update DB
const { error: updateError } = await supabase
  .from("Colors_Image")
  .update({
    Color: color.name,
    Images: finalImages,  // ✅ now all are full URLs
    Stock: color.stock,
  })
  .eq("id", color.id)
  .eq("Product_Id", productId);

    if (updateError) return false;

    return true;
  
  } catch (err) {
    console.error("Error updating color variant:", err);
    return false;
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
      .from("Product_Images") 
      .upload(filePath, img);

    if (uploadError) return false;

    
    const { data } = supabase.storage
      .from("Product_Images")
      .getPublicUrl(filePath);

    if (data?.publicUrl) {
      uploadedPaths.push(data.publicUrl);
    }
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

