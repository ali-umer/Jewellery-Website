"use client";
import {CartCard} from "@/components/CartComponents/cartCard";

import React from "react";

export default function CartContainer({ items,RemoveItem, priceChange }: { items: any[], RemoveItem: (id: number) => void, priceChange: () => void }) {
  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <CartCard key={item.Cart_Id} item={item} RemoveItem={RemoveItem} priceChange={priceChange}/>
      ))}
    </div>
    
  );
}
