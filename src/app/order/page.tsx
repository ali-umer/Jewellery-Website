
"use client"
import OrderCard from "@/components/orderComponent/OrderCard";

import getOrders from "@/hooks/Backend/get-Order"

export default function Order() {
  const { orders, loading, error } = getOrders();

  return (
    <div className="w-[95%] mx-auto py-8">
      {loading ? (
        <p className="text-gray-500 text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Failed to load orders</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={order.id}
              Total={order.Total}
              Date={order.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}

