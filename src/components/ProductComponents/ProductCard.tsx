"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import Thumbnails from "@/components/ProductComponents/ProductThumbnails";
import QuickView from "@/components/QuickView/MainView";
import Image from "next/image";

interface ProductCardProps {
  name?: string;
  price?: number;
  images?: string[];
}

export default function ProductCard({ name, price, images = [] }: ProductCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Products/${name}`);
  };

  return (
    <>
      <CardContainer className="inter-var w-[85%] sm:w-[28rem]">


<CardBody className="relative group sm:w-[28rem] h-[38rem] rounded-xl p-2 flex flex-col overflow-hidden">

  
  {/* Image Area */}
  <div
    className="h-[80%] w-full relative overflow-hidden border-b-2 border-gray-300 rounded-t-xl"
    onClick={handleClick}
  >
    <div className="relative w-full h-full">
      <Image
        src={images[activeIndex]}
        alt={name || "Product Image"}
        fill
        className="object-cover rounded-t-xl"
        priority
      />
    </div>

    {/* Quick View Button */}
    <button
      className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl font-semibold 
                bg-transparent text-[var(--gold)] opacity-0 group-hover:opacity-100 
                transition-opacity"
      onClick={(e) => {
        e.stopPropagation();
        setShowQuickView(true);

      }}
    
    >
      Quick view
    </button>
  </div>

  {/* Info Area */}
 {/* Info Area */}
<div className="h-[22%] w-full flex flex-col justify-center items-start px-2 pt-3 pb-2 bg-transparent relative">
  
  {/* Title + Price - Now in column */}
  <div className="w-full flex flex-col items-start mb-2 px-1">
    <span className="font-playfair-display text-base sm:text-xl font-bold text-[var(--gold)] truncate w-full">
      {name}
    </span>
    <span className="text-sm sm:text-lg font-bold text-[var(--gold)]">
      ${price?.toFixed(2)}
    </span>
  </div>

  {/* Thumbnails (scrollable) */}
  {images.length > 1 && (
    <div className="w-full overflow-x-auto flex gap-1 px-0 hide-scrollbar">
      <Thumbnails
        images={images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  )}
</div>
</CardBody>

      </CardContainer>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-transparent max-w-4xl w-full rounded-xl relative">
            <button
              className="absolute top-4 right-2 text-black text-xl font-bold"
              onClick={() => setShowQuickView(false)}
            >
              &times;
            </button>

            <QuickView name={name} price={price} handleView={setShowQuickView}  />
          </div>
        </div>
  
      )}
    </>
  );
}
