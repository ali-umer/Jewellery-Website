"use client";

import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import DetailsSection from "@/components/QuickView/ProductDetails";
import useProductController from "@/hooks/Controllers/use-Product-Controller";
import { addToCart } from "@/hooks/Backend/use-Cart-Insert";
import { Loader } from "@/components/loading";
import UserMessage from "../userMessages";
import  {checkAuth}  from "@/hooks/Backend/login-Checker";
import { usePathname, useRouter } from "next/navigation"; 
import { useState } from "react";
import Link from "next/link";

interface QuickViewProps {
  productId: number;
  name: string;
  price: number;
  discount: number;
  handleView: (open: boolean) => void;
}

export default function QuickView({
  productId,
  name,
  price,
  discount,
  handleView,
}: QuickViewProps) {
  const {
    quantity,
    setQuantity,
    colors,
    activeColor,
    setActiveColor,
    activeImages,
    isLoading,
  } = useProductController({ product_id: productId, type: "QuickView" });

  const pathname = usePathname();
  const router = useRouter();
  

  const [userMessage, setUserMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);

  const handleCart = async () => {
    const result=await checkAuth();
    if (!result) {
      router.push('/login');
      return;
    }

    setUserMessage(null);
    const res = await addToCart(productId, activeColor, quantity);
    if (res.success) {
      setUserMessage({
        text: `Successfully! ${name} moved to your Cart`,
        success: true,
      });
    } else {
      setUserMessage({
        text:res.message,
        success: false,
      });
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row p-4 md:p-6 rounded-lg max-w-5xl mx-auto shadow-md gap-2 
                 bg-red-900 w-[95%] md:w-auto min-h-screen md:min-h-fit relative"
    >
      <button
        className="absolute top-4 right-4 text-white bg-black bg-opacity-30 hover:bg-opacity-50 
                   p-2 rounded-full z-50"
        onClick={() => handleView(false)}
      >
        ✕
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-[400px] bg-red-900 md:min-h-[500px] rounded-lg">
          <Loader />
        </div>
      ) : (
        <>
          <ImagesSection images={activeImages} />
          <div className="md:w-[54%] p-6 space-y-3 bg-transparent rounded-xl shadow-lg border border-amber-100 flex flex-col justify-center">
            <DetailsSection name={name} price={price} discount={discount} />
            <ColorSelector
              colors={colors}
              activeColor={activeColor}
              onChange={setActiveColor}
            />
            <QuantityControl
              quantity={quantity}
              setQuantity={setQuantity}
              QuickView={true}
            />
            <ActionButtons handleCart={handleCart} />
          </div>
        </>
      )}

      {userMessage && (
        <UserMessage
          message={userMessage.text}
          success={userMessage.success}
        />
      )}
    </div>
  );
}
