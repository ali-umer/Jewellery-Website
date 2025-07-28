"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category }: { category: { name: string; src: string; Count?: number } }  ) {
  const router = useRouter(); 

  function CategoryPage(Category_Name: string) {
      router.push(`/Category/${Category_Name}`);
  }

  return (
    
      <div className="relative dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-110 w-full md:w-110 cursor-pointer transition-transform duration-200 
                      hover:scale-105"
  onClick={() => CategoryPage(category.name)}>
      <img
        src={category.src}
        alt={category.name}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] text-center">
        <span className="text-[var(--gold)] text-2xl font-semibold">
          {category.name}
        </span>

        <span className="text-[var(--gold)] text-base mt-1">
          {category.Count ? `${category.Count} products` : ""}
        </span>
      </div>
    </div>
  );
}
