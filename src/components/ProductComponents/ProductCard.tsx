"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import Thumbnails from "@/components/ProductComponents/ProductThumbnails";
import QuickView from "@/components/QuickView/MainView";
import Image from "next/image";


interface ProductCardProps {
  name: string;
  price: number;
  images: string[];
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
      <CardContainer className="inter-var w-full">
        <CardBody className="relative group w-full h-[38rem] rounded-xl p-2 flex flex-col overflow-hidden shadow-lg hover:border-2 border-var(--gold)">
          {/* Image Area */}
          <div
            className="h-[80%] w-full relative overflow-hidden rounded-t-xl"
            onClick={handleClick}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[activeIndex]}
                alt={name || "Product Image"}
                fill
                className="object-cover rounded-t-xl"
                priority
                sizes="(max-width: 500px) 100vw, (max-width: 800px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* Quick View Button */}
            <button
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl font-semibold 
                        bg-black/70 px-4 py-1 rounded-full text-[var(--gold)] opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
            >
              Quick view
            </button>
          </div>

          {/* Info Area */}
          <div className="h-[22%] w-full flex flex-col justify-center items-start px-2 pt-3 pb-2 bg-transparent relative">
            {/* Title + Price */}
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
          <div className="bg-white max-w-4xl w-full rounded-xl relative">
            <button
              className="absolute top-4 right-4 text-black text-2xl font-bold z-10 hover:scale-110 transition-transform"
              onClick={() => setShowQuickView(false)}
            >
              &times;
            </button>
            <QuickView name={name} price={price} handleView={setShowQuickView} />
          </div>
        </div>
      )}
    </>
  );
}