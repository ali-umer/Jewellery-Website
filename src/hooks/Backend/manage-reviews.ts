import { supabase } from "@/lib/supabaseClient";
import { use } from "react";

export async function Eligibility(productId: number) {
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

      if (authError || !user) {
   
      return false;
    }

    const userId = user.id;


  const { data, error } = await supabase
  .from("OrderDetails")
  .select("id, Order_Id!inner(User_Id)")
  .eq("Product_Id", productId)
  .eq("Order_Id.User_Id", userId)
  .single();


     console.log("Data from the eligibilty is" ,data);
  if (error) {
    console.log(error);
    return false;
  }

  return !!data;
}
