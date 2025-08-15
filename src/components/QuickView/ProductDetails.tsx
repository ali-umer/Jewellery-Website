import React from "react";

interface ProductDetailProps {
  name?: string;
  price?: number;
  description?: string;
  discount?: number;
  productCard?: boolean;
}

export default function ProductDetail({name = "",price = 0,description = "",  discount = 10,productCard = false,}: ProductDetailProps) {
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount? Math.round(price - (price * discount) / 100) : price;

  return (
    <div className="p-5 rounded-xl bg-transparent shadow-lg space-y-2">
   
      <div className={`${productCard ? "text-center" : ""}`}>
        <h1 className={`font-bold text-[var(--gold)] ${
            productCard ? "text-[clamp(1.5rem,3vw,2rem)]" : "text-[clamp(2.2rem,5vw,3.2rem)]" }`}
        >
          {name}
        </h1>
        {description !== "" && (
          <p
            className={`mt-2 text-white ${
              productCard ? "text-sm text-left max-w-[90%] mx-auto"  : "text-base"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <div
        className={`flex items-baseline gap-3 ${
          productCard ? "justify-end" : ""
        }`}
      >
        {hasDiscount && (
          <p
            className={`line-through text-white ${
              productCard ? "text-base" : "text-xl"
            }`}
          >
            Rs. {price}
          </p>
        )}

        <p
          className={`font-semibold text-[var(--gold)] ${
            productCard ? "text-lg" : "text-2xl"
          }`}
        >
          Rs. {discountedPrice}
        </p>

        {hasDiscount && (
          <span
            className={`bg-red-100 text-red-600 font-semibold rounded-full ${
              productCard ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1"
            }`}
          >
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}
