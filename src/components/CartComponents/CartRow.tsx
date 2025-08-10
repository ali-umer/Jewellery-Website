"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCartItem } from "@/hooks/Backend/use-Cart-Delete";
import ProductDetails from "@/components/CartComponents/ProductDetails";
import QuantityControl from "@/components/CartComponents/QuantityControl";

interface CartItemProps {
  item: {
    Cart_Id: number;
    Name: string;
    Price: number;
    Quantity: number;
    Image?: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.Quantity);

  const handleDelete = () => {
    console.log("Delete button clicked for Cart_Id:", item.Cart_Id);
    deleteCartItem(item.Cart_Id);
  };

  return (
    <div className="flex items-start bg-transparent rounded-xl p-4 gap-6 hover:scale-105 transition duration-150 relative">
      {/* Product Image */}
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

      {/* Product Details & Quantity */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProductDetails name={item.Name} price={item.Price} />

        <QuantityControl
          cartId={item.Cart_Id}
          initialQuantity={item.Quantity}
          onQuantityChange={(q) => setQuantity(q)}
        />

       
        <div className="flex items-center justify-between md:justify-end gap-4 relative">
          <span className="text-lg font-medium">
            Rs. {item.Price * quantity}
          </span>

          <button
            type="button"
            onClick={handleDelete}
            className="absolute right-0 text-[var(--gold)] p-1 rounded hover:scale-125 transition duration-150"
          >
            <Trash2 className="w-6 h-7 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
}
