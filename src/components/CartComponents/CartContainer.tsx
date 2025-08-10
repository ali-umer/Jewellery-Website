"use client";
import CartItem from "@/components/CartComponents/CartRow";
import React from "react";


export default function CartContainer({ items}) {
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
         <CartItem key={item.Cart_Id} item={item} />
      ))}
    </div>
  );
}


