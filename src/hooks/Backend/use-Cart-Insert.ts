import { supabase } from "@/lib/supabaseClient";


export async function addToCart( productId: number,color: string,quantity: number) {

const { data: colorImage, error: colorError } = await supabase
              .from("Colors_Image")
              .select("id")
              .eq("Product_Id", productId)
              .eq("Color", color)
              .single();

if (colorError) {
  console.log(colorError);
  return;
}

const { data, error } = await supabase
  .from("Cart")
  .insert({
    Product_Color_Id: colorImage.id,
    Quantity: quantity
  });

};




export async function UpdateQuantity(Cart_Id: number,quantity: number){
const { data, error } = await supabase
                    .from("Cart")
                    .update({ Quantity: quantity })
                    .eq("id", Cart_Id)
                    .single();

}
