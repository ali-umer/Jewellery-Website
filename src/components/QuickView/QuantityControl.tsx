"use client";
import React from "react";

interface QuantityControlProps {
  quantity: number;
  setQuantity: (qty: number) => void;
  QuickView:boolean;
}
export default function QuantityControl({ quantity, setQuantity, QuickView=false }: QuantityControlProps) {
  return (
    <div className="relative flex items-center gap-2 py-4 px-2">
     
       <span className={`font-playfair-display font-semibold text-[var(--gold)] absolute left-6 top-1/2 -translate-y-1/2 drop-shadow
        ${QuickView ? "text-xl" : "text-[clamp(1.5rem,2vw,2.2rem)]"}
      `} >
      Quantity
        </span>
      
      <div className="flex items-center justify-center w-full ml-32">
           <button  onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 text-xl rounded-full  hover:bg-amber-200 transition font-bold text-amber-700">
              −
            </button>

            <span className="mx-4 text-xl font-bold text-[var(--gold)]">
              {quantity}  </span>

            <button onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 text-xl rounded-full hover:bg-amber-200 transition font-bold text-amber-700">
              +
            </button>

      </div>
    </div>
  );
}