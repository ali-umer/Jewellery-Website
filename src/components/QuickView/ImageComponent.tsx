"use client"
import { useImageSelector } from "@/hooks/image-view-controller";
import {SimpleImageCard} from "@/components/QuickView/ImageCard";
import Image from "next/image";

interface ImagesSectionProps {
  images: string[];
}

export default function ImagesSection({ images }: ImagesSectionProps) {
  const { activeIndex, handleSelect, thumbsRef } = useImageSelector(images);
   console.log("Images are " , images);

  return (
    <div className="flex w-full justify-center items-center h-full gap-4">
       <div className="flex flex-col gap-2 overflow-y-auto h-[38rem] pr-2">
                { images.length > 1 && 
                 images.map((img, idx) => (
                  <div  key={idx}
                        onClick={() => handleSelect(idx)}
                        ref={(el) => {thumbsRef.current[idx] = el; }}
                       className={`relative w-16 h-16 rounded border-2 cursor-pointer ${
                          idx === activeIndex ? "border-black" : "border-gray-300"
                        }`}
                  >
                  
                    <Image
                          src={img}  
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                        />
                  </div>
                ))}
      </div>
      <SimpleImageCard src={images[activeIndex]} alt={`Image ${activeIndex + 1}`} />
    </div>
  );
}


