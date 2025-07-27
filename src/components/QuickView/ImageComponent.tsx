"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImagesSectionProps {
  images: string[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Correct typing: HTMLImageElement[] with nulls
  const thumbsRef = useRef<(HTMLImageElement | null)[]>([]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    thumbsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => {
          const next = (prev + 1) % images.length;
          thumbsRef.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
          return next;
        });
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => {
          const next = (prev - 1 + images.length) % images.length;
          thumbsRef.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="flex w-full justify-center items-center h-full gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 overflow-y-auto h-[38rem] pr-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => handleSelect(idx)}
            ref={(el) => (thumbsRef.current[idx] = el)}
            className={`w-16 h-16 object-cover rounded border-2 cursor-pointer ${
              idx === activeIndex ? "border-black" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <SimpleImageCard src={images[activeIndex]} alt={`Image ${activeIndex + 1}`} />
    </div>
  );
}

// ✅ Clean, simple Image card using next/image
function SimpleImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full sm:w-[28rem] h-[38rem] rounded-xl border border-gray-300 overflow-hidden bg-white">
      <div className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
