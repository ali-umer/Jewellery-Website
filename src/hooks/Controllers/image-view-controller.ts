"use client";

import { useState, useRef, useEffect } from "react";

export function useImageSelector(images: string[] = []) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<(HTMLImageElement | null)[]>([]);

  // Reset activeIndex when images array changes
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const handleSelect = (index: number) => {
    if (images.length === 0) return;
    if (index < 0 || index >= images.length) return;
    
    setActiveIndex(index);
    thumbsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (images.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev + 1) % images.length;
          thumbsRef.current[next]?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev - 1 + images.length) % images.length;
          thumbsRef.current[next]?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return { 
    activeIndex: images.length > 0 ? activeIndex : 0, 
    setActiveIndex, 
    handleSelect, 
    thumbsRef 
  };
}