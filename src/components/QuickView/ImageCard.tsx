"use client"
import Image from "next/image";

export function SimpleImageCard({ src, alt }: { src: string; alt: string }) {
  console.log( "Simple image is " + src);
  return (
    <div className="w-full sm:w-[28rem] h-[38rem] rounded-xl border border-gray-300 overflow-hidden bg-white">
      <div className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
