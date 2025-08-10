import { supabase } from "@/lib/supabaseClient";



export const deleteCartItem= async function(cartId:number){
    console.log("Hello from the Cart Reducer",cartId);

   const { data, error } = await supabase
                            .from("Cart")
                            .delete()
                            .eq("id", cartId);

       if (error) {
            console.error("Error deleting item:", error);
          } else {
            console.log("Item deleted:", data);
          }
}

