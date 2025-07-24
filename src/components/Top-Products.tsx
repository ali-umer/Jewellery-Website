"use client";

import React, { useEffect, useRef,useState } from "react";
import ProductCard from "@/components/Product-Card";

const productData = [
  {
    name: "Elegant Necklace",
    price: "$299",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"]
  },
  {
    name: "NY Skyline Print",
    price: "$120",
    images: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"],
  },
  {
    name: "Lion Portrait",
    price: "$350",
    images: ["https://images.unsplash.com/photo-1456926631375-92c8ce872def"],
  },
  {
    name: "Healthy Bowl",
    price: "$85",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"],
  },
  {
    name: "Mountain Art",
    price: "$199",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
  },
];

export default function Cards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [prducts, setProducts] = useState(productData); 

  useEffect(function(){
     
    const fetchProducts = async () => {
        const data=await fetch("https://api.example.com/products");
        const products = await data.json(); 
          setProducts(products);
    }
    fetchProducts();
  },[]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full px-6 py-10">
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-110"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-110"
      >
        ▶
      </button>

    
      <div
        ref={scrollRef}
        className="flex md:flex-col-4 sm:flex-col-1 gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
            {productData.map((product, index) => (
              <div key={index} className="snap-start">
                <ProductCard name={product.name} price={product.price} images={product.images} />
              </div>
            ))}
      </div>
    </div>
  );
}