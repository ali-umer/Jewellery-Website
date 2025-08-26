import React from "react";
import { useCreateOrderFromCart } from "@/hooks/Backend/create-Order";
import { LargeNumberLike } from "crypto";


export default function Checkout({totalPrice,Check}: { totalPrice: number,Check: () => Promise<void> }) {
const { createOrder, loading, success, error } = useCreateOrderFromCart();

const handleCreateOrder = async () => {
 
  await createOrder();
};


const handleCheckOrder = async () => {
 await Check();
  
};

return (
  <div className="absolute mb-10">

    
      <div className="flex justify-between items-center text-lg sm:text-xl font-semibold">
        <span>Total:</span>
        <span>{totalPrice.toFixed(0)}</span>
      </div>
      <button 
        onClick={handleCreateOrder}
        disabled={loading}
        className={`w-full py-2 mt-2 rounded-lg font-semibold transition-all ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[var(--gold)] text-black hover:bg-yellow-400"
        }`}
      >
        {loading ? "Processing..." : "Checkout"}
      </button>


        <button 
        onClick={handleCheckOrder}
        disabled={loading}
        className={`w-full py-2 mt-2 rounded-lg font-semibold transition-all ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green text-white hover:bg-yellow-400"
        }`}
      >
        Check Order
      </button>

      {/* Messages */}
      {success && (
        <p className="text-green-500 text-center font-medium mt-2">
          Order created successfully!
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center font-medium mt-2">{error.message}</p>
      )}
  </div>
);
}