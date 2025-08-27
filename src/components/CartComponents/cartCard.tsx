"use client";
import React, { useState } from "react";
import { deleteCartItem } from "@/hooks/Backend/use-Cart-Delete";
import { ProductDetails } from "@/components/CartComponents/ProductDetails";
import { QuantityControl } from "@/components/CartComponents/QuantityControl";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import UserMessage from "../userMessages";

interface CartItemProps {
  item: {
    Cart_Id: number;
    Name: string;
    Price: number;
    Quantity: number;
    Image?: string;
    Description?: string;
    Discount?: number;
    include: boolean ;
    message?: string;
  };
  RemoveItem: (id: number) => void;
  priceChange: () => void;
}

function CartCardComponent({ item, RemoveItem,priceChange }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.Quantity);
  console.log("Rendering CartCard for:", item.Cart_Id);

  const handleDelete = () => {
    console.log("Delete button clicked for Cart_Id:", item.Cart_Id);
    const result=deleteCartItem(item.Cart_Id)
 
    RemoveItem(item.Cart_Id);
  };

  const handleQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    item.Quantity = newQuantity;
    priceChange();
  };

  return (
    <div className="relative flex bg-black/80 text-[var--(gold)] rounded-md overflow-hidden shadow-lg hover:scale-[1.02] transition duration-200 min-h-[180px]">
      {/* Product Image */}

      {item.include === false && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-600 bg-opacity-70 flex flex-col items-center justify-center z-10 p-4">
          <p className="text-white text-2xl font-bold mb-2 text-center">
            Low Stock
          </p>
          <p className="text-white text-lg text-center">
            {item.message || "Insufficient stock"}
          </p>
  </div>

      )}

      {item.include === true && (
        <>
      <div className="w-36 md:w-44 flex-shrink-0 md:p-2 p-4">
        {item.Image && (
          <Image
            src={item.Image}
            alt={item.Name}
            width={200}
            height={200}
            className="object-cover w-full md:h-full h-[80%] rounded-md"
          />
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <button
          onClick={handleDelete}
          className="absolute top-3 right-2 text-[var--(gold)] hover:scale-125 transition"
        >
          <Trash2 className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <ProductDetails
          name={item.Name}
          price={item.Price}
          discount={item.Discount}
          description={item.Description || null}
        />
        <QuantityControl
          cartId={item.Cart_Id}
          initialQuantity={quantity}
          onQuantityChange={(q) => handleQuantity(q)}
        />

        <div className="text-lg font-semibold">
          Rs.{" "}
          {(item.Discount ? (item.Price - item.Price * (item.Discount / 100)) * quantity  : item.Price * quantity).toFixed(0)}
        </div>
      </div>
      </>
      )}
    </div>
  );
}


export const CartCard = React.memo(CartCardComponent);
