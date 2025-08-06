"use client"
import {useRef,useEffect} from "react";
import ProductCard from "@/components/ProductComponents/ProductCard";
import { useCategoryProducts } from "@/hooks/use-Category-Products";
import {useIntersectionObserver} from "@/components/ui/InffiniteScroll"

interface ProductCardGridProps {
  Display?: string;
}

export default function ProductCardGrid({ Display = "" }: ProductCardGridProps) {
  const { products, getMore } = useCategoryProducts(2 ,1);

     const lastRef = useRef<HTMLDivElement | null>(null);
     useIntersectionObserver(lastRef as React.RefObject<Element>, getMore, 1000);


      useEffect(()=>{
        getMore();
      },[]);
  return (
    <>
      <h3 className="text-center pt-12 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)] tracking-tight font-playfair-display">
        {Display}
      </h3>

     <div className="w-full px-2 py-6 overflow-x-hidden">
       <div className="mx-auto max-w-screen-2xl px-4">
         <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
            {products.map((product, index) => {
              const isLast = index === products.length - 1;
              return (
                <div
                  key={index}
                  className="w-full max-w-[28rem]"
                  ref={isLast ? lastRef : null}
                >
                  <ProductCard
                    Id={product.id}
                    name={product.Name}
                    price={product.Price}
                    images={product.Images}
                  />
          </div>
        );
      })}
    </div>
  </div>
</div>

    </>
  );
}
