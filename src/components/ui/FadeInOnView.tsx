"use client";
import { useRef, useEffect } from "react";

export default function FadeInOnView({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("animate-fade-in-up"); // reset
          void el.offsetWidth; // force reflow
          el.classList.add("animate-fade-in-up"); // re-trigger
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}