"use client";

import { useState } from "react";
import { UpdateQuantity } from "@/hooks/Backend/use-Cart-Insert";

interface QuantityControlProps {
  cartId: number;
  initialQuantity: number;
  onQuantityChange: (q: number) => void;
}

export default function QuantityControl({
  cartId,
  initialQuantity,
  onQuantityChange,
}: QuantityControlProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [showSave, setShowSave] = useState(false);

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
    setShowSave(true);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange(newQty);
      setShowSave(true);
    }
  };

  const handleSave = async () => {
    await UpdateQuantity(cartId,quantity);
    setShowSave(false);
  }
    

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xl">Quantity</span>
        <div className="flex">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 hover:border-1 rounded-full border-yellow-300"
          >
            -
          </button>
          <span className="px-3 py-1">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 hover:border-1 rounded-full border-yellow-300"
          >
            +
          </button>
        </div>
      </div>
      {showSave && (
        <button
          onClick={handleSave}
          className="bg-[var(--gold)] text-black px-3 py-1 rounded hover:opacity-80 text-sm"
        >
          Save
        </button>
      )}
    </div>
  );
}
