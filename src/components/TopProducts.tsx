"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductComponents/ProductCard";
import { useSuggestion } from "@/hooks/Backend/use-Suggestion";

export default function Cards({ProductId,  CategoryId,}: {  ProductId: number;CategoryId: number;}) 
{
  const suggestedProducts = useSuggestion(
    ProductId === -1 ? null : ProductId,
    CategoryId === -1 ? null : CategoryId
  );

  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let initialCount = 1;
    const width = window.innerWidth;
    if (width >= 1024) initialCount = 4;
    else if (width >= 640) initialCount = 3;
    setVisibleCount(initialCount);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.querySelector(".snap-start");
      if (cardElement) {
        const scrollAmount = cardElement.clientWidth + 8;
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });

        if (
          direction === "right" &&
          visibleCount < suggestedProducts.length
        ) {
          setVisibleCount((prev) => prev + 1);
        }
      }
    }
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center gap-2">
       
        <button
          onClick={() => scroll("left")}
          
          className="bg-transparent p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        
        <div
          ref={scrollRef}
          className="flex-1 flex gap-2 md:gap-8 overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
        >
          {suggestedProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-[100%] md:w-[28rem]"
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

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="bg-transparent p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
