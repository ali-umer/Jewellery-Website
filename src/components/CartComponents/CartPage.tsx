"use client";
import CartContainer from "@/components/CartComponents/CartContainer";
import { useCart } from "@/hooks/Backend/use-Cart";
import {Loader} from "@/components/loading";



export default function CartPage() {
  const{cartItems,setCartItems,loading}=useCart();
 
   if(loading){
        return ( <Loader /> );
   }   

 const totalPrice = cartItems.reduce(
  (sum, item) => {
    const priceAfterDiscount = item.Discount ?item.Price *(1-item.Discount/100):item.Price;
    return sum + priceAfterDiscount * item.Quantity;
  },0
);

  const RemoveItem=function(id:number){
    setCartItems((prev) => prev.filter((item) => item.Cart_Id !== id));
  }


  return (  

    <div className="w-[95%] md:w-[75%] bg-transparent border-black border-2 mt-16 p-8 mx-auto text-[var(--gold)] max-h-screen">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>  ) : (
        <>
          <CartContainer items={cartItems} RemoveItem={RemoveItem} />
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
