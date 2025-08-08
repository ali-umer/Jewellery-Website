"use client"

import React from "react";
import CategoryCard from "./CategoryCard";
import { useCategoryController } from "@/hooks/Backend/use-Category-Controller";


export default function Categories() {
  const { Category, loading, error }=useCategoryController();
   console.log(Category);

 return (
  <div className="flex flex-wrap items-center justify-center gap-4 mt-10 md:gap-10 px-4 overflow-x-hidden">
    <div className="w-full text-center mb-8"> 
      <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)]">
        CATEGORIES
      </h3>
    </div>
    
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="w-full h-full py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 justify-center min-w-0"> {/* Increased gaps */}
          {Category.map((Category, idx) => (
            <div key={idx} className="min-w-0 h-full"> 
              <CategoryCard Name={Category.Name} Products={Category.Products} src={Category.Image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}