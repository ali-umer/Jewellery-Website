"use client";

import { useState } from "react";
import EditProductForm from "./editProductDetails";
import ProductColorManager from "./colorParent";

interface EditSectionTabsProps {
  productId: number; 
  insertColorsWithImages: (productId: number, colors: any) => Promise<void>; 
}

export default function EditSectionTabs({ productId, insertColorsWithImages }: EditSectionTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "images">("details");

  return (
    <div className= "pt-25 w-full flex flex-col items-center mt-6 space-y-6">
      {/* Tabs */}
      <div className="flex bg-neutral-900 shadow-lg rounded-xl overflow-hidden">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-6 py-3 text-sm font-semibold transition 
            ${activeTab === "details" 
              ? "bg-[var(--gold)] text-black shadow-md" 
              : "text-white hover:bg-neutral-700"}`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`px-6 py-3 text-sm font-semibold transition 
            ${activeTab === "images" 
              ? "bg-[var(--gold)] text-black shadow-md" 
              : "text-white hover:bg-neutral-700"}`}
        >
          Images & Stock Section
        </button>
      </div>

      {/* Render Section */}
      <div className="w-full">
        {activeTab === "details" ? (
          <EditProductForm productId={productId} />
        ) : (
          <ProductColorManager 
            id={productId} 
            submit={insertColorsWithImages} 
          />
        )}
      </div>
    </div>
  );
}

