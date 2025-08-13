"use client";

import { useState, useEffect } from "react";
import { UpdateQuantity } from "@/hooks/Backend/use-Cart-Insert";

interface QuantityControlProps {
  cartId: number;
  initialQuantity: number;
  onQuantityChange: (q: number) => void;
}

export function QuantityControl({
  cartId,
  initialQuantity,
  onQuantityChange,
}: QuantityControlProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [originalQuantity, setOriginalQuantity] = useState(initialQuantity);
  const [showSave, setShowSave] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    setQuantity(value);
    onQuantityChange(value);
    setShowSave(true);
  };

  const handleSave = async () => {
    await UpdateQuantity(cartId, quantity);
    setOriginalQuantity(quantity);
    setShowSave(false);
  };

  const handleCancel = () => {
    setQuantity(originalQuantity);
    onQuantityChange(originalQuantity);
    setShowSave(false);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >

      <span className="text-lg sm:text-base">Quantity: {quantity}</span>

      <div className={`flex items-center gap-2 transition-opacity duration-200  ${isMobile || hovered ? "opacity-100" : "opacity-0 sm:opacity-0"}`}>
        <button  onClick={handleDecrement}
          className="px-2 py-1 rounded-full border border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition"
        >
          -
        </button>
        <input type="number" value={quantity} min={1} onChange={handleInputChange}
          className="w-14 text-center bg-transparent border border-[var(--gold)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]
                     appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={handleIncrement}
          className="px-2 py-1 rounded-full border border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition"
        >
          +
        </button>
      </div>

      {showSave && (
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleSave}
            className="bg-[var(--gold)] text-black px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
