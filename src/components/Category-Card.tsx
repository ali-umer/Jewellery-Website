"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category }) {
  const router = useRouter(); 

  function CategoryPage(Category_Name: string) {
      router.push(`/Category/${Category_Name}`);
  }

  return (
    
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-110 w-110 cursor-pointer transition-transform duration-200 
                      hover:scale-105 hover:shadow-2xl"
  onClick={() => CategoryPage(category.name)}>
      <img
        src={category.src}
        alt={category.name}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] text-center">
        <span className="text-amber-200 text-2xl font-semibold">
          {category.name}
        </span>

        <span className="text-amber-200 text-base mt-1">
          {category.Count ? `${category.Count} products` : ""}
        </span>
      </div>
    </div>
  );
}
