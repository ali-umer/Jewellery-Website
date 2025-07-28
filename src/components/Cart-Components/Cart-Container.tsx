"use client";
import CartRow from "@/components/Cart-Components/Cart-Row";
import React from "react";


export default function CartContainer({ items, onDelete }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        < CartRow key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}


