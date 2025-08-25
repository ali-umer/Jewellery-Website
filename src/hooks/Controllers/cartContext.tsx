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
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider that uses your existing hook
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, setCartItems, cartCount, loading, error } = useCartHook();

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartCount, loading, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Expose useCart from context
export const useCartContext = () => {
  const context = useContext(CartContext);
  // ✅ instead of throwing, return safe defaults
  if (!context) {
    return {
      cartItems: [],
      setCartItems: () => {},
      cartCount: 0,
      loading: false,
      error: null,
    };
  }
  return context;
};
