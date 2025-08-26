import { supabase } from "@/lib/supabaseClient";



export const deleteCartItem= async function(cartId:number){
    console.log("Hello from the Cart Reducer",cartId);

    
   const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.log(userError);
    return false;
  }

   const { data, error } = await supabase
                            .from("Cart")
                            .delete()
                            .eq("id", cartId)
                            .eq("UserID", user.id);

       if (error) {
            console.error("Error deleting item:", error);
          } else {
            console.log("Item deleted:", data);
          }

     return error?false:true;    
}

