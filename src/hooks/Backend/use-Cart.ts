import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  Name: string;
  Description: string;
  Price: number;
  Discount: number;
}

interface ColorsImage {
  Color: string;
  Images: string[];
  Products: Product; // From the relation
}

interface FormattedCartItem {
  Cart_Id: number;
  Product_Color_Id: string;
  Color_Name: string;
  Image: string;
  Name: string;
  Description: string;
  Quantity: number;
  Price: number;
  Discount: number;
}

const formatCartData = (data: any[]): FormattedCartItem[] => {
  console.log("[formatCartData] Raw data received:", data);

  return data.map((item) => {
    const colorsImage: ColorsImage = item.Colors_Image || {};
    const product: Product = colorsImage.Products || {};

    return {
      Cart_Id: item.id,
      Product_Color_Id: item.Product_Color_Id,
      Color_Name: colorsImage.Color || "",
      Image: Array.isArray(colorsImage.Images) ? colorsImage.Images[0] || "" : "",
      Name: product.Name || "",
      Description: product.Description || "",
      Quantity: item.Quantity || 1,
      Price: product.Price || 0,
      Discount: product.Discount || 0,
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
      console.log("[useCart] Fetching cart items...");

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
              Description,
              Price,
              Discount
            )
          )
        `);

      if (error) {
        console.error("[useCart] Supabase query error:", error);
        setError(error.message);
        setCartItems([]);
        return;
      }

      console.log("[useCart] Raw data from Supabase:", data);

      if (data) {
        const formatted = formatCartData(data);
        console.log("[useCart] Formatted cart items:", formatted);
        setCartItems(formatted);
      }
    } catch (err) {
      console.error("[useCart] Unexpected error:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
      console.log("[useCart] Finished fetching cart items");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return { cartItems, setCartItems, loading,error};
};
