"use client";
import { useState, useEffect } from "react";
import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import DetailsSection from "@/components/QuickView/ProductDetails";

const ProductVariants = {
  "Red": [
    "https://images.unsplash.com/photo-1570968915860-54d5c2b37e5f",
    "https://images.unsplash.com/photo-1564866657313-2917d30a0e8e"
  ],
  "Yellow": [
    "https://images.unsplash.com/photo-1600185365925-3b5f8bb4d216",
    "https://images.unsplash.com/photo-1589987603086-2c1e071f8c0c"
  ],
  "Blue": [
    "https://images.unsplash.com/photo-1603349206290-b9a172b15c82"
  ]
};

const Colors = Object.keys(ProductVariants);

export default function QuickView({ name="", price=0,discount=10}) {
  const [quantity, setQuantity] = useState(1);
  const [colors, setColors] = useState(Colors);
  const [activeColor, setActiveColor] = useState(Colors[0]);
  const [activeImages, setActiveImages] = useState([]);

  function handleColorChange(color=colors[0]) {
    setActiveColor(color);
    setActiveImages(ProductVariants[color] ?? []);
  }

  return (
  <div className="flex flex-col bg-red-900  md:flex-row p-6 rounded-lg max-w-5xl mx-auto shadow-md gap-between gap-2">
    <ImagesSection images={activeImages} />

    <div className="md:w-1/2 p-6 space-y-6 bg-transparent rounded-xl shadow-lg border border-amber-100 flex flex-col justify-center">
      <DetailsSection name={name} price={price} discount={discount} />

      <div>
        <ColorSelector
          colors={colors}
          activeColor={activeColor}
          onChange={handleColorChange}
        />
      </div>

      <QuantityControl quantity={quantity} setQuantity={setQuantity} QuickView={true} />
      <ActionButtons/>
    </div>
  </div>
);
}
