"use client"
import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    Cart_Id: string;
    Name: string;
    Price: number;
    Quantity: number;
    Image?: string;
  };
  onDelete: (cartId: string) => void;
}

export default function CartItem({ item, onDelete }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.Quantity);
  const [showSave, setShowSave] = useState(false);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setShowSave(true);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setShowSave(true);
    }
  };

  const handleSave = () => {
    setShowSave(false);
  };

  const handleDelete = () => {
    console.log("Delete button clicked for Cart_Id:", item.Cart_Id);
    onDelete(item.Cart_Id);
  };

  return (
    <div className="flex items-start bg-transparent rounded-xl p-4 gap-6 hover:scale-200 transition duration-75">
      <div className="w-24 flex-shrink-0">
        {item.Image && (
          <Image
            src={item.Image}
            alt={item.Name}
            width={200}
            height={200}
            className="rounded-xl object-cover w-full h-24"
          />
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product Details */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold">{item.Name}</h2>
          <p className="text-lg font-medium mt-1">Rs. {item.Price}</p>
        </div>

        {/* Quantity Controls - Centered */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Quantity:</span>
            <div className="flex border border-gray-600 rounded">
              <button 
                onClick={handleDecrement}
                className="px-2 py-1 hover:bg-gray-800"
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="px-2 py-1 hover:bg-gray-800"
              >
                +
              </button>
            </div>
          </div>
          {showSave && (
            <button
              onClick={handleSave}
              className="bg-yellow-600 text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm"
            >
              Save
            </button>
          )}
        </div>

        {/* Total Price + Delete - Far right */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-lg font-medium">
            Rs. {item.Price * quantity}
          </span>
          <button
            onClick={handleDelete}
            className="text-[var(--gold)] hover:border-2 border-amber-300 p-1 rounded"
          >
            <Trash2 className="w-6 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}