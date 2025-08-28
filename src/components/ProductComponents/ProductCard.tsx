"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import QuickView from "@/components/QuickView/MainView";
import {DiscountTag} from "@/components/discountTag";
import ProductDetail from "../QuickView/ProductDetails";

interface ProductCardProps {
  Id: number;
  name: string;
  price: number;
  images: string[];
  Discount:number;
  Description:string;
}

export default function ProductCard({ Id, name, price, images,Discount,Description}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);

      console.log("Images in the Product Card " ,images );
    

  return (
    <>
      <div className="relative w-full">
       
       {Discount !== 0 && <DiscountTag discount={Discount} />}

       <CardContainer className="inter-var w-full">
  <div className="relative group w-full md:h-[38rem] h-[30rem] rounded-xl p-2 flex flex-col overflow-hidden shadow-lg hover:border-2 border-[var(--gold)]">
    
    {/* Image Section */}
    <CardItem
      className="relative w-full flex-grow min-h-[50%] max-h-[80%] overflow-hidden rounded-t-xl"
    >
      <Link href={`/Products/${Id}`} className="block h-full w-full relative">
        {images?.length > 0 && (
          <Image
            src={images[0]}
            alt={name || "Product Image"}
            fill
            className="object-cover rounded-t-xl"
            priority
            sizes="(max-width: 500px) 100vw, (max-width: 800px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </Link>

    <button
  className="
    absolute bottom-4 left-1/2 -translate-x-1/2 text-sm sm:text-base font-semibold
    bg-black/70 px-5 py-1.5 rounded-full text-[var(--gold)]
    opacity-100 sm:opacity-0 sm:group-hover:opacity-100
    transition-opacity duration-300 z-10
    flex items-center gap-2
  "
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
  <span className="hidden sm:inline">Quick View</span>
</button>

    </CardItem>

    {/* Detail Section */}
    <div
      className="w-full flex flex-col justify-center bg-transparent relative flex-shrink min-h-[20%] max-h-[40%] overflow-hidden p-2"
    >
      <ProductDetail
        name={name}
        price={price}
        discount={Discount}
        description={Description}
        productCard={true}
      />
    </div>
  </div>
</CardContainer>

      </div>

     {showQuickView && (
  <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
    <div
      className="
        h-full 
        w-full sm:w-[28rem] max-w-full
        rounded-l-xl relative shadow-xl
        transition-transform transform
        overflow-y-auto
      "
    >
    
      <div className="p-4">
        <QuickView
          productId={Id}
          name={name}
          price={price}
          discount={0}
          handleView={setShowQuickView}
        />
      </div>
    </div>
  </div>
)}

    </>
  );
}
