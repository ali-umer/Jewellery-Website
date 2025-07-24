"use client";

import React, { useState } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import Thumbnails from "@/components/Product-Thumbnails";
import QuickView from "@/components/Qucik-View"; 

interface ProductCardProps {
  name?: string;
  price?: string;
  images?: string[];
}


export default function ProductCard({ name="", price="", images=[]}: ProductCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <CardContainer className="inter-var">
        <CardBody className="relative dark:bg-black group/image border-2 border-gray-400 w-[100%] sm:w-[28rem] h-[38rem] rounded-xl p-0 flex flex-col overflow-hidden">

          {/* Image */}
          <div className="h-[80%] w-full relative overflow-hidden border-b-2 border-gray-300">
            <img
              src={images[activeIndex]}
              alt={name}
              className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover/image:scale-105 group-hover/image:brightness-90"
            />

            <button
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl font-semibold hover:text-amber-700 transition bg-transparent text-white"
              onClick={() => setShowQuickView(true)}
            >
              Quick view
            </button>
          </div>

          {/* Name + Price + Thumbnails */}
          <div className="h-[22%] w-full flex justify-center items-center px-4 py-3 bg-transparent dark:border-neutral-600 backdrop-blur-sm relative">
            <div className="w-full flex justify-between items-center mb-1">
              <span className="font-playfair-display text-xl font-bold text-amber-700 dark:text-amber-300">
                {name}
              </span>
              <span className="text-lg font-bold text-amber-800 dark:text-gray-200">
                {price}
              </span>
            </div>

            {images.length > 1 && (
              <Thumbnails images={images} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            )}
          </div>
        </CardBody>
      </CardContainer>

      {/* Render QuickView only when triggered */}
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
