import React from 'react';

export default function ProductDetail({product}) {
return (
       <>
            <div>
                <h1 className="text-3xl text-[clamp(2rem,5vw,3rem)] font-bold">{product.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            </div>

            <div>
                <p className="text-sm text-[var(--gold)] text-[clamp(1rem,3vw,1.5rem)]">
                Rs. {product.price.toLocaleString()}
                </p>
            </div>
            </>
       
     )
}