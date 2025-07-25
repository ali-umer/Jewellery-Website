"use client";

import React, { useState, useEffect } from "react";
import ImagesSection from "@/components/Quick-View/Image-Component";
import ColorSelector from "@/components/Quick-View/Colors-Component";
import QuantityControl from "@/components/Quick-View/Quantity-Control";
import ActionButtons from "@/components/Quick-View/Active-Buttons";
import ProductDetail from "@/components/Quick-View/Product-Details";
import AddReview from "@/components/Review-Input";
import ReviewContainer from "./Review-Container";
import TopSellers from "@/components/Top-Selling-Products";
// Color to Image Variant Map
const ProductVariants = {
  ruby: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
  ],
  sapphire: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
  ],
  gold: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
  ],
  opal: [
    "https://images.unsplash.com/photo-1589987603086-2c1e071f8c0c", // Opal ring
    "https://images.unsplash.com/photo-1617042352135-4894d6ec94b8"  // Opal earring
  ],
  pearl: [
    "https://images.unsplash.com/photo-1616628182507-54d5b6e3c800", // Pearl necklace
    "https://images.unsplash.com/photo-1617042339973-e1d939ed8d8c"  // Pearl ring
  ]
};
const Colors = Object.keys(ProductVariants);

// Example product data
const product = {
  title: "Handcrafted Gemstone Pendant",
  description: "An elegant, handmade pendant crafted with care. Perfect for gifting or personal wear.",
  price: 3800,
  colors: ["ruby", "sapphire", "gold", "opal", "pearl"]
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImages, setActiveImages] = useState(ProductVariants[product.colors[0]]);

  useEffect(() => {
    setActiveImages(ProductVariants[selectedColor] ?? []);
  }, [selectedColor]);

  return (
  <div className="min-h-screen bg-transparent  py-10 px-4 sm:px-6 md:px-10 text-[var(--gold)]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-center h-full">

    
      <div className="flex-1 h-full border-black border-2 rounded-2xl relative overflow-hidden">
        <ImagesSection images={activeImages} />
      </div>

      
      <div className="flex-1 flex flex-col rounded-2xl justify-between gap-6 border-black border-2">
        <ProductDetail product={product} />

        <ColorSelector 
          colors={product.colors}
          activeColor={selectedColor}
          onChange={setSelectedColor}
        />

        <QuantityControl 
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <ActionButtons />
        <div className="pt-3 flex justify-center items-center">
  <AddReview />
</div>

        
      </div>
    </div>
     
     <div className="mt-10">
     <ReviewContainer />
     </div>
     <TopSellers />
  </div>


);
}
