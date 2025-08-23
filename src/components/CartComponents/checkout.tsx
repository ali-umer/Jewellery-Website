import React from "react";
import { useCreateOrderFromCart } from "@/hooks/Backend/create-Order";


export default function Checkout() {
const { createOrder, loading, success, error } = useCreateOrderFromCart();

const handleCreateOrder = async () => {
  await createOrder();
};

return (
  <div className="absolute">
    <button onClick={handleCreateOrder} disabled={loading}>
      {loading ? "Processing..." : "Create Order"}
    </button>
    {success && <p>Order created successfully!</p>}
    {error && <p style={{ color: "red" }}>{error.message}</p>}
  </div>
);
}