"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import QuickView from "@/components/QuickView/MainView";
import {DiscountTag} from "@/components/discountTag";

interface ProductCardProps {
  Id: number;
  name: string;
  price: number;
  images: string[];
  Discount?:number;
}

export default function ProductCard({ Id, name, price, images,Discount=0}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);

      console.log("Images in the Product Card " ,images );
    

  return (
    <>
      <div className="relative w-full">
       
       {Discount !== 0 && <DiscountTag discount={Discount} />}

        <CardContainer className="inter-var w-full">
          <CardBody className="relative group w-full md:h-[38rem] h-[30rem] rounded-xl p-2 flex flex-col overflow-hidden shadow-lg hover:border-2 border-[var(--gold)]">
            <CardItem className="relative h-[80%] w-full overflow-hidden rounded-t-xl">
              <Link href={`/Products/${Id}`} className="block h-full w-full relative">
                {images?.length > 0 && (
                  <Image
                    src={images[0]}
                    alt={name || "Product Image"}
                    fill
                    className="object-cover rounded-t-xl"
                    priority
                    sizes="(max-width: 500px) 100vw, (max-width: 800px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
              </Link>

              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm sm:text-base font-semibold 
                  bg-black/70 px-5 py-1.5 rounded-full text-[var(--gold)] opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
              >
                Quick View
              </button>
            </CardItem>

            <div className="h-[20%] w-full flex flex-col justify-center items-start px-2 pt-3 pb-2 bg-transparent relative">
              <div className="w-full flex flex-col items-start mb-2 px-1">
                <span className="font-playfair-display text-base sm:text-xl font-bold text-[var(--gold)] truncate w-full">
                  {name}
                </span>
                <span className="text-sm sm:text-lg font-bold text-[var(--gold)]">
                  ${price?.toFixed(2)}
                </span>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </div>

      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-xl relative">
            <button
              className="absolute top-4 right-4 text-black text-2xl font-bold z-10 hover:scale-110 transition-transform"
              onClick={() => setShowQuickView(false)}
            >
              &times;
            </button>
            <QuickView
              productId={Id}
              name={name}
              price={price}
              discount={0}
              handleView={setShowQuickView}
            />
          </div>
        </div>
      )}
    </>
  );
}
