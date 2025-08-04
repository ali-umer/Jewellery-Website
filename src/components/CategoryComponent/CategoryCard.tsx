"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CategoryCard({ Name,Products,src}: { Name: string; Products:number; src: string  }) {
  const router = useRouter();
   
  function CategoryPage(Category_Name: string) {
    router.push(`/Category/${Category_Name}`);
  }

  return (
    <div 
      className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col h-[400px] w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:border-1 border-[var(--gold)]"
      onClick={() => CategoryPage(Name)}
    >
      <div className="relative w-full h-full"> {/* Container for Image */}
        <Image
          src={src || ""}
          alt={Name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] text-center">
        <span className="text-[var(--gold)] text-2xl font-semibold">
          {Name}
        </span>
        <span className="text-[var(--gold)] text-base mt-1">
          {Products ? `${Products} products` : ""}
        </span>
      </div>
    </div>
  );
}