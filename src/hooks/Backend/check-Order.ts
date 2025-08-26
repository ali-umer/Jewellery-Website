import { supabase } from "@/lib/supabaseClient";

export async function checkOrder(
  Product_Color_Id: number,
  Quantity: number
): Promise<{ include: boolean; available?: number }>{
  try {
  
    // 2️⃣ Get stock from Colors_Image
    const { data: colorData, error: colorError } = await supabase
      .from("Colors_Image")
      .select("Stock")
      .eq("id",Product_Color_Id)
      .single();

    if (colorError || !colorData) {
      console.error("checkOrder error fetching Colors_Image:", colorError);
      return { include: false, available: 0 };
    }

    // 3️⃣ Compare stock
    if (Quantity <= colorData.Stock) {
      return { include: true };
    } else {
      return { include: false, available: colorData.Stock };
    }
  } catch (err) {
    console.error("Unexpected error in checkOrder:", err);
    return { include: false, available: 0 };
  }
}
