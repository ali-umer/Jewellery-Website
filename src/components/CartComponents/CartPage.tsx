"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/Backend/use-Cart";
import { Loader } from "@/components/loading";
import UserMessage from "@/components/userMessages";
import CartContainer from "@/components/CartComponents/CartContainer";
import { useRouter, usePathname } from "next/navigation";
import Checkout from "./checkout";
import { checkAuth } from "@/hooks/Backend/login-Checker";
import { useCartContext } from "@/hooks/Controllers/cartContext";
import {checkOrder} from "@/hooks/Backend/check-Order";

export default function CartPage() {
  const { cartItems, setCartItems, loading, error } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(0);

  
  useEffect(() => {
  if (cartItems.length > 0) {
    handlePrice();
  } else {
    setTotalPrice(0);
  }
}, [cartItems]);


  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("Error loading cart:", error);
    return (
      <UserMessage
        message="Something Went Wrong! Try it Later"
        success={false}
      />
    );
  }
const CheckOrder = async () => {
  if (cartItems.length === 0) return;

  const updatedCart = await Promise.all(
    cartItems.map(async (item) => {
      const stockResult = await checkOrder( item.Product_Color_Id,item.Quantity);

      return { ...item,
        include: stockResult.include,
        message: stockResult.include === false
          ? `Only ${stockResult.available} items available`
          : undefined ,
      };
    })
  );

  setCartItems(updatedCart);
};

  const handlePrice=function(){
  const Amount = cartItems.reduce((sum, item) => {
    if(item.include===false){
      return sum;
    }
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
        <div className="gap-y-3">
          <CartContainer items={cartItems} RemoveItem={RemoveItem} priceChange={handlePrice}/>
           <Checkout totalPrice={totalPrice} Check={CheckOrder} />

        </div>
      )}
    </div>
  );
}
