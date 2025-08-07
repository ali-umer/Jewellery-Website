"use client";

import React from "react";
import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import ProductDetail from "@/components/QuickView/ProductDetails";
import AddReview from "@/components/ReviewComponents/ReviewInput";
import ReviewContainer from "../ReviewComponents/ReviewContainer";
import TopSellers from "@/components/TopSellingProducts";
import useProductController from "@/hooks/use-Product-Controller";



interface ProductPageProps {
  Id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductPage({ Id, name, price, description }: ProductPageProps) {

   const {
    quantity,
    setQuantity,
    colors,  
    activeColor,
    setActiveColor,
    activeImages,
    isLoading
  } = useProductController({ product_id: 2 });

  
  console.log("Active Images in Product Page are " ,activeImages);

  

  return (
    <div className="min-h-screen bg-transparent py-2 px-4 sm:px-6 md:px-8 text-[var(--gold)]">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:gap-8 gap-6 justify-center w-full">
        
        <div className="md:w-1/2 w-full border-black border-2 rounded-2xl relative overflow-hidden">
          <ImagesSection images={activeImages} />
        </div>

        
        <div className="md:w-1/2 w-full flex flex-col border-black border-2 rounded-2xl justify-between gap-6">
          <ProductDetail
            name={name}
            price={price}
            description={description}
          />
          <ColorSelector
            colors={colors}
            activeColor={activeColor}
            onChange={setActiveColor}
          />
          <QuantityControl
            quantity={quantity}
            setQuantity={setQuantity}
            QuickView={false}
          />
          <ActionButtons ViewDetails={false} />
        </div>
      </div>

    
      <div className="mt-10 max-w-[1300px] mx-auto px-2">
        <ReviewContainer />
      </div>

    
      <div className="mt-4 max-w-[1300px] mx-auto px-2">
        <TopSellers name="Suggestions" />
      </div>
    </div>
  );
}
