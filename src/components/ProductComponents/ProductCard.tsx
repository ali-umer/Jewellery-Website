"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import QuickView from "@/components/QuickView/MainView";
import {DiscountTag} from "@/components/discountTag";
import ProductDetail from "../QuickView/ProductDetails";

interface ProductCardProps {
  Id: number;
  name: string;
  price: number;
  images: string[];
  Discount?:number;
  Description:string;
}

export default function ProductCard({ Id, name, price, images,Discount=0,Description}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);

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
                  bg-black/80 px-5 py-1.5 rounded-full text-[var(--gold)] opacity-100
                  transition-all duration-300 z-10 hover:bg-black hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
              >
                View
              </button>
            </CardItem>

           <div
      className="w-full flex flex-col justify-center bg-transparent relative flex-shrink min-h-[20%] max-h-[40%] overflow-hidden p-2"
    >
      <ProductDetail
        name={name}
        price={price}
        discount={Discount}
        description={Description}
        productCard={true}
      />
    </div>
          </CardBody>
        </CardContainer>
      </div>

      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-transparent max-w-4xl w-full max-h-[90vh] rounded-xl relative overflow-hidden flex flex-col">
            <button
              className="absolute top-4 right-4 text-black text-2xl font-bold z-10 hover:scale-110 transition-transform bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              onClick={() => setShowQuickView(false)}
            >
              &times;
            </button>
            <div className="overflow-y-auto flex-grow p-4">
              <QuickView
                productId={Id}
                name={name}
                price={price}
                discount={Discount}
                handleView={setShowQuickView}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}