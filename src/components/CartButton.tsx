"use client"
import { ShoppingCart } from 'lucide-react';


export default function CartButton({ count = 0,mobile = false, handleCart,}: { count?: number; mobile?: boolean;handleCart: () => void;}) {
  return (
    <button   className={`relative flex items-center gap-2 text-white ${mobile ? 'w-full' : ''}`} 
            onClick={handleCart}  >
              
      <ShoppingCart className="w-5 h-5" />
      {mobile && <span className="text-sm">Cart</span>}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
