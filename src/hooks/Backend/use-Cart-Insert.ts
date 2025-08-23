import { supabase } from "@/lib/supabaseClient";


export async function addToCart(productId: number, color: string, quantity: number) {
 
  const { data: colorImage, error: colorError } = await supabase
    .from("Colors_Image")
    .select("id")
    .eq("Product_Id", productId)
    .eq("Color", color)
    .single();

  if (colorError) {
    console.log(colorError);
    return false;
  }

  // Get user ID
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.log(userError);
    return false;
  }

  // Insert into cart
  const { data, error } = await supabase
    .from("Cart")
    .insert({
      Product_Color_Id: colorImage.id,
      Quantity: quantity,
      UserID: user.id
    });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}




export async function UpdateQuantity(Cart_Id: number,quantity: number){
const { data, error } = await supabase
                    .from("Cart")
                    .update({ Quantity: quantity })
                    .eq("id", Cart_Id)
                    .single();

     return error?false:true;               

}
