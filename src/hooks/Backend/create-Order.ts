import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useCreateOrderFromCart() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const createOrder = useCallback(async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    // 1. Auth check
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError({ message: "User not authenticated" });
      setLoading(false);
      return false;
    }

    const userId = user.id;

    // 2. Fetch Cart Items
    const { data: cartItems, error: cartError } = await supabase
      .from("Cart")
      .select("id, Product_Color_Id, Quantity")
      .eq("UserID", userId);

    if (cartError) {
      setError({ message: `Failed to fetch cart items: ${cartError.message}` });
      setLoading(false);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError({ message: "Cart is empty. Add items before creating an order." });
      setLoading(false);
      return;
    }

    // 3. Insert into Orders
    const { data: orderData, error: orderError } = await supabase
      .from("Orders")
      .insert({ User_Id: userId })
      .select("id")
      .single();

    if (orderError || !orderData) {
      setError({ message: `Failed to create order: ${orderError?.message}` });
      setLoading(false);
      return;
    }

    const orderId = orderData.id;

    // 4. Prepare OrderDetails using Product_Color_Id directly
    const orderDetails = cartItems.map(item => ({
      Order_Id: orderId,
      Product_Id: item.Product_Color_Id, // ✅ This is Colors_Image.id
      Quantity: item.Quantity
    }));

    // 5. Insert into OrderDetails
    const { error: orderDetailsError } = await supabase
      .from("OrderDetails")
      .insert(orderDetails);

    if (orderDetailsError) {
      setError({ message: `Failed to insert order details: ${orderDetailsError.message}` });
      setLoading(false);
      return;
    }

    // 6. Clear Cart
    const { error: clearCartError } = await supabase
      .from("Cart")
      .delete()
      .eq("UserID", userId);

    if (clearCartError) {
      setError({ message: `Failed to clear cart: ${clearCartError.message}` });
      setLoading(false);
      return;
    }

    // Success
    setSuccess(true);
    setLoading(false);
    return orderId;
  }, []);

  return { createOrder, loading, success, error };
}
