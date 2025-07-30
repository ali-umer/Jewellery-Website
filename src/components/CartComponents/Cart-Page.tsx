"use client";
import { useState } from "react";
import CartContainer from "@/components/CartComponents/Cart-Container";

const cartItemsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1580894732444-fd7f963d5f62",
    slug: "wireless-headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1516570161787-efcb7fe40b43",
    slug: "smart-watch",
  },
];




export default function CartPage() {
  const [cartItems, setCartItems] = useState(cartItemsData);

  const handleDelete =function(id){
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    
    
    <div className="w-[75%] bg-transparent border-black border-2 mt-16 p-8 mx-auto text-[var(--gold)] min-h-screen">
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>  ) : (
        <>
          <CartContainer items={cartItems} onDelete={handleDelete} />
          <div className="text-right mt-8 border-t border-yellow-600 pt-4">
            <h2 className="text-2xl font-semibold">
              Total: {totalPrice.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
