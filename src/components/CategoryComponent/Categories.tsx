"use client";
import React from "react";
import { useState,useEffect} from "react";
import CategoryCard from "./CategoryCard";

  const tempData = [
    {
      name: "Necklaes",
      Count: "199",
      src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bangales",
      Count: "99",
      src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Earings",
      Count: "499",
      src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "iPhone 15 Pro Max",
      Count: "199",
      src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Camera",
      Count: 799,
      src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Jwellery Sets",
      Count: 99,
      src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];


export default function Categories() {
  const [products, setProducts] = useState(tempData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       // const fetchedProducts = await fetch("https://api.example.com/products");
       // const data = await fetchedProducts.json();
      //   setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

 return (
  <div id="products" className="flex flex-wrap items-center justify-center gap-4 mt-10 md:gap-10 px-4 overflow-x-hidden">
    <div className="w-full text-center mb-8"> {/* Increased bottom margin */}
      <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)]">
        CATEGORIES
      </h3>
    </div>
    
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="w-full h-full py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 justify-center min-w-0"> {/* Increased gaps */}
          {products.map((product, idx) => (
            <div key={idx} className="min-w-0 h-full"> 
              <CategoryCard category={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}