import { supabase } from "@/lib/supabaseClient";

interface ColorVariant {
  id: number;
  name: string;
  stock: number;
  images: string[]; 
}

export async function getColorVariants(productId: number): Promise<ColorVariant[]> {
    console.log("Id is",productId);
  const { data, error } = await supabase
                            .from("Colors_Image")
                            .select("id, Color, Stock, Images")
                            .eq("Product_Id", productId);
                            console.log(data);

  if (error) {
    console.error("Error fetching color variants:", error);
    return [];
  }

  const variants: ColorVariant[] = (data || []).map((item: any) => ({
    id: item.id,
    name: item.Color,
    stock: item.Stock,
    images: item.Images || [], 
  }));

  return variants;
}
