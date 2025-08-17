import { supabase } from "@/lib/supabaseClient";

export const deleteProduct = async (productId: number) => {
  try {
    const folderName = `product-${productId}`;

    // First list all files in the folder
    const { data: files, error: listError } = await supabase
      .storage
      .from("Product_Images")
      .list(folderName);

    if (listError) {
      console.error("Error listing product images:", listError);
    }

    // Prepare full paths of all files to delete
    const filesToDelete = files?.map(file => `${folderName}/${file.name}`) || [];

    // Delete all files in the folder
    if (filesToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .storage
        .from("Product_Images")
        .remove(filesToDelete);

      if (deleteError) {
        console.error("Error deleting product images:", deleteError);
      } else {
        console.log(`Deleted ${filesToDelete.length} files from folder "${folderName}"`);
      }
    }

    // Then delete the product record
    const { error: dbError } = await supabase
      .from("Products")
      .delete()
      .eq("id", productId);

    if (dbError) {
      console.error("Error deleting product:", dbError);
      return false;
    }

    console.log(`Product ${productId} and its images deleted successfully`);
    return true;
  } 
  catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
};