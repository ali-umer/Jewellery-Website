"use client"
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useEffect } from 'react';
import { useCart } from '@/hooks/Backend/use-Cart';
import { useCartContext } from '@/hooks/Controllers/cartContext';


export default function CartButton({ count = 0,mobile = false, handleCart,}: { count?: number; mobile?: boolean;handleCart: () => void;}) {
   const {cartItems} = useCartContext();
   const [cartCount, setCount] = React.useState(count);
   
   useEffect(() => {
    setCount(cartItems.length);
   }, [cartItems]);

   

  return (
    <button   className={`relative flex items-center gap-2 text-white ${mobile ? 'w-full' : ''}`} 
            onClick={handleCart}  >
              
      <ShoppingCart className="w-5 h-5" />
      {mobile && <span className="text-sm">Cart</span>}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
}
