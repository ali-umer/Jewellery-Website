"use client";

import React, { useState, useRef, useEffect } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";

interface ImagesSectionProps {
  images: string[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<Array<HTMLImageElement | null>>([]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    thumbsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Handle arrow key events
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
    <div className="flex w-full justify-center items-center h-full">
      
      <div className="flex flex-col gap-2 overflow-y-auto h-[38rem] pr-2">
       {images.map((img, idx) => (
                  <img key={idx} src={img}  onClick={() => handleSelect(idx)}
                     ref={(el) => {
                      thumbsRef.current[idx] = el;
                    }}
                     className={`w-16 h-16 object-cover rounded border-2 cursor-pointer transition ${
                      idx === activeIndex ? "border-black" : "border-gray-300"
                    }`}
                  />
                ))}
      </div>

      <CardContainer className="inter-var">
        <CardBody className="relative dark:bg-black group/image border-2 border-gray-400 w-[100%] sm:w-[28rem] h-[38rem] rounded-xl p-0 flex flex-col overflow-hidden">
          <div className="h-full w-full relative overflow-hidden">
            <img
              src={images[activeIndex]}
              alt={`Active-${activeIndex}`}
              className="object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover/image:scale-105 group-hover/image:brightness-90"
            />
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
