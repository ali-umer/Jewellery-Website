"use client";
import React, { useState } from "react";
import { useCart } from "@/hooks/Backend/use-Cart";
import { Loader } from "@/components/loading";
import UserMessage from "@/components/userMessages";
import CartContainer from "@/components/CartComponents/CartContainer";
import { useRouter, usePathname } from "next/navigation";
import Checkout from "./checkout";

export default function CartPage() {
  const { cartItems, setCartItems, loading, error } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
   //const authChecked = useAuthCheck(); 
  const router = useRouter();
  const pathname = usePathname();
/*
  // 🚀 If not logged in, redirect to login with return URL
  if (!authChecked) {
    router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    return null; // prevent UI flicker
  }
    */

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <UserMessage
        message="Something Went Wrong! Try it Later"
        success={false}
      />
    );
  }


  const handlePrice=function(){
  const Amount = cartItems.reduce((sum, item) => {
    const priceAfterDiscount = item.Discount
      ? item.Price * (1 - item.Discount / 100)
      : item.Price;
    return sum + priceAfterDiscount * item.Quantity;
  }, 0);;
    setTotalPrice(Amount);
  }


  const RemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.Cart_Id !== id));
  };

  return (
    <div className="w-[95%] md:w-[75%] bg-transparent border-black border-2 mt-16 p-8 mx-auto text-[var(--gold)] max-h-screen">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <CartContainer items={cartItems} RemoveItem={RemoveItem} priceChange={handlePrice}/>
           <Checkout totalPrice={totalPrice} />

        </>
      )}
    </div>
  );
}
