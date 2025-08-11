"use client";
import CartContainer from "@/components/CartComponents/CartContainer";
import { useCart } from "@/hooks/Backend/use-Cart";



export default function CartPage() {
  const{cartItems,fetchCartItems,loading}=useCart();
 
   if(loading)
     return <p> Loading</p>

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );


  return (  

    <div className="w-[75%] bg-transparent border-black border-2 mt-16 p-8 mx-auto text-[var(--gold)] min-h-screen">
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>  ) : (
        <>
          <CartContainer items={cartItems}/>
          <div className="text-right mt-8 border-t border-var[(--gold)]" >
            <h2 className="text-2xl font-semibold">
              Total: {totalPrice}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
