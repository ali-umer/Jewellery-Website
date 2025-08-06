"use client";
import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  callback: () => void,
  delay: number = 1000
) {
  const triggered = useRef(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          callback();

          setTimeout(() => {
            triggered.current = false;
          }, delay);
        }
      },
      { threshold: 1 } // Trigger only when 100% visible
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref, callback, delay]);
}
