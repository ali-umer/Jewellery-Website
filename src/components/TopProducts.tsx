"use client";

import React, { useRef,useEffect,useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductComponents/ProductCard";
import { useSuggestion } from "@/hooks/Backend/use-Suggestion";



export default function Cards({ProductId,CategoryId}:{ProductId:number,CategoryId:number}) {
  
  const  suggestedProducts  = useSuggestion(
    ProductId === -1 ? null :  ProductId ,
    CategoryId === -1? null: CategoryId 
  );


  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.querySelector(".snap-start");
      if (cardElement) {
        const scrollAmount = cardElement.clientWidth + 8;
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative w-full py-6">
      {/* Scrollable Cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
        >
          {suggestedProducts.map((product, index) => (
            <div key={index} className="snap-start flex-shrink-0 w-[100%] md:w-[28rem]"
            >
              <ProductCard
                 Id={product.id}
                name={product.Name}
                price={product.Price}
                images={product.Images}
              />
            </div>
          ))}
        </div>

       
        <div className="absolute top-1/2 left-1 z-10 -translate-y-1/2">
          <button  onClick={() => scroll("left")}
            className="bg-transparent p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 right-1 z-10 -translate-y-1/2">

          <button onClick={() => scroll("right")}
            className="bg-transparent p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </div>
  );
}
