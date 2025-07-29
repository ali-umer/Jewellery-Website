"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CategoryCard({ category }: { category: { name: string; src: string; Count?: number } }) {
  const router = useRouter();

  function CategoryPage(Category_Name: string) {
    router.push(`/Category/${Category_Name}`);
  }

  return (
    <div 
      className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col h-[400px] w-full cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => CategoryPage(category.name)}
    >
      <div className="relative w-full h-full"> {/* Container for Image */}
        <Image
          src={category.src}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

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