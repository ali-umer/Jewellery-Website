
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ Name,src}: { Name: string;src: string  }) {
  
  return (
    <Link href={`/Category/${Name}`} className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col h-[400px] w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:border-1 border-[var(--gold)]">

      <div className="relative w-full h-full"> 
        <Image
          src={src || ""}
          alt={Name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] text-center">
        <span className="text-[var(--gold)] text-2xl font-semibold">
          {Name}
        </span>
       </div>
    </Link>
  );
}