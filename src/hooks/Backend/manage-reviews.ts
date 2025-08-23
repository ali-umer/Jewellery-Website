import { supabase } from "@/lib/supabaseClient";

export async function Eligibility(productId: number) {
  // Step 1: Get the current user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return false;
  }

  const userId = user.id;

  // Step 2: Get all order IDs of the user
  const { data: orders, error: orderError } = await supabase
    .from("Orders")
    .select("id")
    .eq("User_Id", userId);

  if (orderError || !orders || orders.length === 0) {
    console.log("Error fetching user orders:", orderError);
    return false;
  }

  const orderIds = orders.map(order => order.id);

  // Step 3: Get all color variant IDs for the given product
  const { data: variants, error: variantError } = await supabase
    .from("Colors_Image")
    .select("id")
    .eq("Product_Id", productId);

  if (variantError || !variants || variants.length === 0) {
    console.log("No variants found for this product:", variantError);
    return false;
  }

  const variantIds = variants.map(variant => variant.id);

  // Step 4: Check if any variant was purchased by the user
  const { data: orderDetails, error: detailError } = await supabase
    .from("OrderDetails")
    .select("id")
    .in("Order_Id", orderIds)
    .in("Product_Id", variantIds); // match Colors_Image.id

  if (detailError) {
    console.log("Error checking order details:", detailError);
    return false;
  }

  return orderDetails.length > 0;
}
