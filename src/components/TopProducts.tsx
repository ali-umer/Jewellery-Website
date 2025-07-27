"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductComponents/ProductCard";

const productData = [
  {
    name: "Elegant Necklace",
    price: 299,
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
  },
  {
    name: "NY Skyline Print",
    price: 120,
    images: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"],
  },
  {
    name: "Lion Portrait",
    price: 50,
    images: ["https://images.unsplash.com/photo-1456926631375-92c8ce872def"],
  },
  {
    name: "Healthy Bowl",
    price: 85,
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"],
  },
  {
    name: "Mountain Art",
    price: 199,
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
  },
];

export default function Cards() {
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
          {productData.map((product, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-full sm:w-[28rem]"
            >
              <ProductCard
                name={product.name}
                price={product.price}
                images={product.images}
              />
            </div>
          ))}
        </div>

        {/* Buttons positioned tightly to scroll area */}
        <div className="absolute top-1/2 left-1 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("left")}
            className="bg-white p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("right")}
            className="bg-white p-2 rounded-full shadow hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
