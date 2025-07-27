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
      <CardContainer className="inter-var">
        <CardBody className="relative dark:bg-black group w-[100%] sm:w-[28rem] h-[38rem] rounded-xl p-0 flex flex-col overflow-hidden">
          
         <div
          className="h-[80%] w-full relative overflow-hidden border-b-2 border-gray-300"
          onClick={handleClick} >

          <div className="relative w-full h-full">
            <Image
              src={images[activeIndex]}
              alt={name || "Product Image"}
              fill
              className="object-cover rounded-t-xl"
              priority
            />
          </div>

          {/* Quick View Button: initially invisible, appears on hover */}
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

          {/* Name + Price + Thumbnails */}
          <div className="h-[22%] w-full flex flex-col justify-center items-center px-4 py-3 bg-transparent relative">
            <div className="w-full flex justify-between items-center mb-1">
              <span className="font-playfair-display text-xl font-bold text-[var(--gold)]">
                {name}
              </span>
              <span className="text-lg font-bold text-[var(--gold)]">
                ${price?.toFixed(2)}
              </span>
            </div>

            {images.length > 1 && (
              <Thumbnails
                images={images}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            )}
          </div>

      
        </CardBody>
      </CardContainer>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-xl relative">
            <button
              className="absolute top-4 right-4 text-black hover:text-red-600 text-xl font-bold"
              onClick={() => setShowQuickView(false)}
            >
              &times;
            </button>

            <QuickView name={name} price={price} />
          </div>
        </div>
  
      )}
    </>
  );
}
