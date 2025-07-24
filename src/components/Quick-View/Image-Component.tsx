"use client";

import { useState, useEffect } from "react";

interface ImagesSectionProps {
  images: string[];
  onImageChange?: (index: number) => void;
}

export default function ImagesSection({ images, onImageChange }: ImagesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (onImageChange) onImageChange(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:w-1/2">
      {/* Main image */}
      <div className="w-full">
        <img
          src={images[activeIndex]}
          alt="Active"
          className="w-full h-96 object-cover rounded-lg border-2 border-black"
        />
      </div>

      
      <div className="flex md:flex-col overflow-y-auto gap-2 max-h-96">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Thumb ${idx}`} onClick={() => handleSelect(idx)}
            className={`w-16 h-16 object-cover rounded border-2 cursor-pointer transition ${
             idx === activeIndex ? "border-black" : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
