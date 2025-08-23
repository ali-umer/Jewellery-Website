import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useCreateOrderFromCart() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const createOrder = useCallback(async (userId: string) => {
    setLoading(true);
    setSuccess(false);
    setError(null);


   const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

      if (authError || !user) {
      setError({ message: "User not authenticated" });
      setLoading(false);
      return false;
    }

    // 1. Get all cart items for the user
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

    // 2. Insert a new order
    const { data: orderData, error: orderError } = await supabase
      .from("Orders")
      .insert({ User_Id: userId })
      .select("id")
      .single();

    if (orderError) {
      setError({ message: `Failed to create order: ${orderError.message}` });
      setLoading(false);
      return;
    }

    const orderId = orderData.id;

    // 3. Fetch Product_Id for each Product_Color_Id
    const productColorIds = cartItems.map(item => item.Product_Color_Id);
    const { data: colors, error: colorsError } = await supabase
      .from("Product_Color")
      .select("id, Product_Id")
      .in("id", productColorIds);

    if (colorsError) {
      setError({ message: `Failed to fetch product colors: ${colorsError.message}` });
      setLoading(false);
      return;
    }

    // 4. Map cart items to order details using actual Product_Id
    const orderDetails = cartItems.map(item => {
      const color = colors.find(c => c.id === item.Product_Color_Id);
      return {
        Order_Id: orderId,
        Product_Id: color ? color.Product_Id : item.Product_Color_Id, // fallback if not found
        Quantity: item.Quantity
      };
    });

    // 5. Insert order details
    const { error: orderDetailsError } = await supabase
      .from("OrderDetails")
      .insert(orderDetails);

    if (orderDetailsError) {
      setError({ message: `Failed to insert order details: ${orderDetailsError.message}` });
      setLoading(false);
      return;
    }

    // 6. Clear the cart
    const { error: clearCartError } = await supabase
      .from("Cart")
      .delete()
      .eq("UserID", userId);

    if (clearCartError) {
      setError({ message: `Failed to clear cart: ${clearCartError.message}` });
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    return orderId;
  }, []);

  return { createOrder, loading, success, error };
}
