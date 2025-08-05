"use client";
import React from "react";

interface ThumbnailsProps {
  images: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function Thumbnails({ images, activeIndex, setActiveIndex }: ThumbnailsProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-2 group-hover/image:flex hidden gap-3 mt-3">
      {images.map((src, index) => (
        <div key={index}  className={`p-[3px] rounded-md transition border-2 ${
            index === activeIndex? "border-amber-500 bg-white" : "border-gray-400"
          }`}
        >
          <img src={src} alt={`Thumbnail ${index}`} onClick={() => setActiveIndex(index)}
            className="w-10 h-10 object-cover rounded-md cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}