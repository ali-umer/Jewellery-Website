import React from 'react';

export default function ProductDetail({ name = "",price = 0,description = "",discount = 10}){
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount? Math.round(price-(price * discount)/100):price;

  return (
    <div className="p-4 rounded-xl bg-transparent shadow-lg space-y-3">
        <div>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-[var(--gold)]">
            {name}
          </h1>
          {description!== "" && (<p className="text-sm text-gray-600 mt-1">{description}</p>)}
        </div>

      <div className="flex items-baseline gap-2">
        {hasDiscount &&(<p className="text-lg text-gray-400 line-through">
            Rs. {price}
          </p> )}

       <p className="text-xl font-semibold text-[var(--gold)]">
          Rs. {discountedPrice}
        </p>
        {hasDiscount &&(<span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
  </div>
  );
}
