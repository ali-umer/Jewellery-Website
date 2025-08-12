"use client";

import React, { useState, useRef, useEffect } from "react";
import { SimpleImageCard } from "@/components/QuickView/ImageCard";
import Image from "next/image";
interface ImagesSectionProps {
  images: string[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<(HTMLDivElement | null)[]>([]); 
 
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
      <div className="flex flex-col gap-2 overflow-y-auto h-[38rem] pr-2">
        {images && images.length > 1 &&
          images.map((img, idx) => {

            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                ref={(el) => {
                  thumbsRef.current[idx] = el;
                }}
                className={`relative w-16 h-16 rounded border-2 cursor-pointer ${
                  idx === activeIndex ? "border-var[(--gold)]" : "border-transparent"
                }`}
              >
                <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover rounded w-full h-full"
                width={500}  
                height={300}
                quality={80} 
                priority={idx === 0} 
                /> 
              </div>
            );
          })}
      </div>

      <SimpleImageCard src={images[activeIndex]} alt={`Image ${activeIndex + 1}`} />
    </div>
  );
}
