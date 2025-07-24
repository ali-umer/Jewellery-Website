import Cards from "@/components/Top-Products";
import React from "react";

export default function TopSellers() {
    return (
        <div id="products" className="flex flex-wrap items-center justify-center h-screen scroll gap-5 md:gap-10 md:ml-20 md:mr-20">
            <div className="w-full text-center px-4">
                <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)] tracking-tight font-playfair-display">
                    TOP SELLING PRODUCTS
                </h3>
                <Cards />
            </div>
           
        </div>

    );
}