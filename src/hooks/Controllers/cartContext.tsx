"use client";
import React, { createContext, useContext } from "react";
import { useCart as useCartHook, FormattedCartItem } from "@/hooks/Backend/use-Cart";

// Define context type
interface CartContextType {
  cartItems: FormattedCartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<FormattedCartItem[]>>;
  cartCount: number;
  loading: boolean;
  error: string | null;
  fetchCartItems: () => Promise<void>;
}


// Create context with default safe values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  loading: false,
  error: null,
  fetchCartItems: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, setCartItems, cartCount, loading, error, fetchCartItems } =
    useCartHook();

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartCount, loading, error, fetchCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use Cart Context
export const useCartContext = () => useContext(CartContext);
