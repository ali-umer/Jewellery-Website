"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductComponents/ProductCard";
import { useSuggestion } from "@/hooks/Backend/use-Suggestion";

export default function Cards({
  ProductId,
  CategoryId,
}: {
  ProductId: number;
  CategoryId: number;
}) {
  const suggestedProducts = useSuggestion(
    ProductId === -1 ? null : ProductId,
    CategoryId === -1 ? null : CategoryId
  );

  const [visibleCount, setVisibleCount] = useState(0); // how many cards are actually rendered
  const scrollRef = useRef<HTMLDivElement>(null);

  // Decide how many to show initially based on screen size
  useEffect(() => {
    let initialCount = 1; // mobile default
    const width = window.innerWidth;
    if (width >= 1024) initialCount = 4; // desktop
    else if (width >= 640) initialCount = 3; // tablet

    setVisibleCount(initialCount);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.querySelector(".snap-start");
      if (cardElement) {
        const scrollAmount = cardElement.clientWidth + 8; // +gap
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });

        // If scrolling right and we have more products not yet rendered, load one more
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
    <div className="relative w-full py-6">
      {/* Scrollable Cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
        >
          {suggestedProducts.slice(0, visibleCount).map((product, index) => (
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

        {/* Left Button */}
        <div className="absolute top-1/2 left-1 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("left")}
            className="bg-transparent p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Right Button */}
        <div className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("right")}
            className="bg-transparent p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
