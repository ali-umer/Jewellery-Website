"use client";
import CartRow from "@/components/CartComponents/Cart-Row";
import React from "react";


export default function CartContainer({ items, onDelete }) {
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
       
        < CartRow key={item.Cart_Id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}


