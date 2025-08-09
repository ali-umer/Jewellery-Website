"use client"
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabaseClient";

interface Product {
  Name: string;
  Price: number;
}

interface ColorsImage {
  Color: string;
  Images: string[];
  product: Product;
}

interface FormattedCartItem {
  Cart_Id: string;
  Product_Color_Id: string;
  Color_Name: string;
  Image: string;
  Name: string;
  Quantity: number;
  Price: number;
}

const formatCartData = (data: any[]): FormattedCartItem[] => {
  return data.map((item) => {
    const colorsImage = item.Colors_Image || {};
    const product = colorsImage.product || {};

    return {
      Cart_Id: item.id,
      Product_Color_Id: item.Product_Color_Id,
      Color_Name: colorsImage.Color || '',
      Image: Array.isArray(colorsImage.Images) ? colorsImage.Images[0] || '' : '',
      Name: product.Name || '',
      Quantity: item.Quantity || 1,
      Price: product.Price || 0,
    };
  });
};




export const useCart = () => {
  const [cartItems, setCartItems] = useState<FormattedCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);

    try {
   const { data, error } = await supabase
  .from("Cart")
  .select(`
    id,
    Product_Color_Id,
    Quantity,
    Colors_Image (
      Color,
      Images,
      Products!Product_Id (
        Name,
        Price
      )
    )
  `);



      if (data)
        { setCartItems(formatCartData(data));
            console.log("Data from the query is",cartItems);
        }
      
    } 
    catch (err) {
      setCartItems([]);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCartItems();
    console.log(cartItems);
  }, []);

  return { cartItems, loading};
};