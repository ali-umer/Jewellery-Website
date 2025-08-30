"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function getOrderDetails(orderId: number) {
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      setLoading(true);
      setError(null);

      // Call RPC instead of nested select
      const { data, error: rpcError } = await supabase.rpc("get_order_details", {
        p_order_id: orderId,
      });

      if (rpcError) {
        setError(rpcError.message);
        setProducts([]);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // Transform result into OrderProduct[]
      const merged: OrderProduct[] = data.map((d: any) => ({
        id: d.product_id,
        name: d.name ?? `Product ${d.product_id}`,
        price: d.price,
        quantity: d.quantity,
        image: d.image ?? null,
      }));

      setProducts(merged);
      setLoading(false);
    }

    fetchOrderDetails();
  }, [orderId]);

  return { products, loading, error };
}

