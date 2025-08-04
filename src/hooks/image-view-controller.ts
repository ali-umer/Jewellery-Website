"use client";

import { useState, useRef, useEffect } from "react";

export function useImageSelector(images: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  return { activeIndex, setActiveIndex, handleSelect, thumbsRef };
}
