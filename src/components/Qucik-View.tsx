"use client";
import { useState, useEffect } from "react";
import ImagesSection from "@/components/Quick-View/Image-Component";
import ColorSelector from "@/components/Quick-View/Colors-Component";
import QuantityControl from "@/components/Quick-View/Details-Component";
import ActionButtons from "@/components/Quick-View/Active-Buttons";

const ProductVariants = {
  "#FF5733": [
    "https://images.unsplash.com/photo-1570968915860-54d5c2b37e5f",
    "https://images.unsplash.com/photo-1564866657313-2917d30a0e8e"
  ],
  "#33FF57": [
    "https://images.unsplash.com/photo-1600185365925-3b5f8bb4d216",
    "https://images.unsplash.com/photo-1589987603086-2c1e071f8c0c"
  ],
  "#3357FF": [
    "https://images.unsplash.com/photo-1603349206290-b9a172b15c82"
  ]
};

const Colors = Object.keys(ProductVariants);

export default function QuickView({ name, price }) {
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState(Colors);
  const [activeColor, setActiveColor] = useState(Colors[0]);
  const [activeImages, setActiveImages] = useState([]);

  function handleColorChange(color) {
    setActiveColor(color);
    setActiveImages(ProductVariants[color] ?? []);
  }

  return (
  <div className="flex flex-col md:flex-row bg-[#fdfaf5] p-6 rounded-lg max-w-5xl mx-auto shadow-md">
    <ImagesSection images={activeImages} />

    <div className="md:w-1/2 p-6 space-y-6 bg-white/90 rounded-xl shadow-lg border border-amber-100 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-[#6c0a23] font-playfair-display drop-shadow mb-2">
        {name}
      </h2>
      <p className="text-2xl font-bold text-[#6c0a23] mb-4">
        Rs.{price}
      </p>

      <div>
        <ColorSelector
          colors={colors}
          activeColor={activeColor}
          onChange={handleColorChange}
        />
      </div>

      <QuantityControl quantity={quantity} setQuantity={setQuantity} />
      <ActionButtons />
    </div>
  </div>
);
}
