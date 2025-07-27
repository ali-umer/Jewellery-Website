"use client";

import React from "react";
import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import ProductDetail from "@/components/QuickView/ProductDetails";
import AddReview from "@/components/ReviewComponents/ReviewInput";
import ReviewContainer from "../ReviewComponents/ReviewContainer";
import TopSellers from "@/components/TopSellingProducts";
import useProductController from "@/hooks/Product-Controller";

const product = {
  title: "Handcrafted Gemstone Pendant",
  description:
    "An elegant, handmade pendant crafted with care. Perfect for gifting or personal wear.",
  price: 3800,
  colors: ["ruby", "sapphire", "gold", "opal", "pearl"],
};

const ProductVariants = {
  ruby: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"],
  sapphire: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"],
  gold: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
  ],
  opal: [
    "https://images.unsplash.com/photo-1589987603086-2c1e071f8c0c",
    "https://images.unsplash.com/photo-1617042352135-4894d6ec94b8",
  ],
  pearl: [
    "https://images.unsplash.com/photo-1616628182507-54d5b6e3c800",
    "https://images.unsplash.com/photo-1617042339973-e1d939ed8d8c",
  ],
};

const productVariants = Object.keys(ProductVariants).reduce((acc = [], color = "") => {
  acc[color] = ProductVariants[color];
  return acc;
}, {});

export default function ProductPage() {
  const {
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    activeImages,
  } = useProductController({ product, productVariants: ProductVariants });

  return (
    <div className="min-h-screen bg-transparent py-6 px-4 sm:px-6 md:px-8 text-[var(--gold)]">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:gap-8 gap-6 justify-center w-full">
        {/* Image Section */}
        <div className="md:w-1/2 w-full border-black border-2 rounded-2xl relative overflow-hidden">
          <ImagesSection images={activeImages} />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 w-full flex flex-col border-black border-2 rounded-2xl justify-between gap-6">
          <ProductDetail
            name={product.title}
            price={product.price}
            description={product.description}
          />
          <ColorSelector
            colors={product.colors}
            activeColor={selectedColor}
            onChange={setSelectedColor}
          />
          <QuantityControl
            quantity={quantity}
            setQuantity={setQuantity}
            QuickView={false}
          />
          <ActionButtons ViewDetails={false} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 max-w-[1300px] mx-auto px-2">
        <ReviewContainer />
      </div>

      {/* Suggestions / Scroller Section */}
      <div className="mt-8 max-w-[1300px] mx-auto px-2">
        <TopSellers name="Suggestions" />
      </div>
    </div>
  );
}
