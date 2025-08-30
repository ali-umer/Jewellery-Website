import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";


export function useCreateOrderFromCart() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const createOrder = useCallback(async (selectedItems: any[]) => {
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

    const { data: orderId, error: orderError } = await supabase.rpc(
      "create_order_from_cart",
      {
        user_id: user.id,
        items: selectedItems // 👈 pass array of items here
      }
    );

    if (orderError) {
      setError({ message: `Failed to create order: ${orderError.message}` });
      setLoading(false);
      return false;
    }

    setSuccess(true);
    setLoading(false);
    return orderId;
  }, []);

  return { createOrder, loading, success, error };
}
