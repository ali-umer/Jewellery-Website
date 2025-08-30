"use client"
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function getOrders() {
  const [orders, setOrders] = useState<{ id: number; Total: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        // ✅ Fetch id, created_at, and Total for each order
        const { data, error: orderError } = await supabase
          .from("Orders")
          .select("id, created_at, Total")
          .eq("User_Id", user.id)
          .order("created_at", { ascending: false });

        if (orderError) {
          setError(orderError.message);
        } else if (data) {
          setOrders(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, loading, error };
}
