import { supabase } from "@/lib/supabaseClient";


export async function addToCart(productId: number, color: string, quantity: number) {

  const { data: colorImage, error: colorError } = await supabase
    .from("Colors_Image")
    .select("id, Stock") 
    .eq("Product_Id", productId)
    .eq("Color", color)
    .single();

  if (colorError) {
     console.log(colorError);
     return { success: false, message: "Error fetching product color." };
  }

  if (!colorImage) {
    return { success: false, message: "Color not found." };
  }

  // 2. Stock validation
  if (quantity > colorImage.Stock) {
    return { 
      success: false, 
      message: `Only ${colorImage.Stock} items available in Stock.` 
    };
  }

  // 3. Get user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, message: "User not logged in." };
  }

  // 4. Insert into cart
  const { error } = await supabase
    .from("Cart")
    .insert({
      Product_Color_Id: colorImage.id,
      Quantity: quantity,
      UserID: user.id
    });

  if (error) {
    return { success: false, message: "Error adding to cart." };
  }

  return { success: true, message: "Successfully! moved to your Cart" };
}




export async function UpdateQuantity(Cart_Id: number,quantity: number){

   const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.log(userError);
    return false;
  }
const { data, error } = await supabase
                    .from("Cart")
                    .update({ Quantity: quantity })
                    .eq("id", Cart_Id)
                    .eq("UserID", user.id)
                    .single();

     return error?false:true;               

}
