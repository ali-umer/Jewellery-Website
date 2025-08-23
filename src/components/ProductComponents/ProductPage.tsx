"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import ProductDetail from "@/components/QuickView/ProductDetails";
import { addToCart } from "@/hooks/Backend/use-Cart-Insert";
import ReviewContainer from "../ReviewComponents/ReviewContainer";
import TopSellers from "@/components/TopSellingProducts";
import useProductController from "@/hooks/Controllers/use-Product-Controller";
import { useIntersectionObserver } from "@/components/ui/InffiniteScroll";
import { Loader } from "@/components/loading";
import AddReview from "@/components/ReviewComponents/ReviewInput";
import { Eligibility } from "@/hooks/Backend/manage-reviews";

export default function ProductPage({ Id }: { Id: number }) {
  const {
    quantity,
    setQuantity,
    colors,
    activeColor,
    setActiveColor,
    activeImages,
    isLoading,
    product,
  } = useProductController({ product_id: Id, type: "ProductPage" });

  const [showReview, setShowReview] = useState(false); // start as false
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const reviewRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const handleReviewIntersect = useCallback(() => {
    setShowReview(true);
  }, []);

  const handleSuggestionIntersect = useCallback(() => {
    setShowSuggestion(true);
  }, []);

  useIntersectionObserver(reviewRef as React.RefObject<Element>, handleReviewIntersect, 0.1);
  useIntersectionObserver(suggestionRef as React.RefObject<Element>, handleSuggestionIntersect, 1);

  // Only fetch eligibility when showReview becomes true
  useEffect(() => {
    if (showReview) {
      Eligibility(Id).then((result) => setIsEligible(result));
    }
  }, [showReview, Id]);

  const handleCart = function () {
    addToCart(Id, activeColor, quantity);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-transparent py-2 px-4 sm:px-6 md:px-8 text-[var(--gold)]">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:gap-8 gap-6 justify-center w-full">
        <div className="md:w-1/2 w-full border-black border-2 rounded-2xl relative overflow-hidden">
          <ImagesSection images={activeImages} />
        </div>

        <div className="md:w-1/2 w-full flex flex-col border-black border-2 rounded-2xl justify-between gap-6">
          {product && (
            <ProductDetail
              name={product.name}
              price={product.price}
              description={product.description}
              productCard={false}
            />
          )}
          <ColorSelector
            colors={colors}
            activeColor={activeColor}
            onChange={setActiveColor}
          />
          <QuantityControl quantity={quantity} setQuantity={setQuantity} QuickView={false} />
          <ActionButtons handleCart={handleCart} ViewDetails={false} />
        </div>
      </div>

      <div className="mt-10 max-w-[1300px] mx-auto px-2" ref={reviewRef}>
        {showReview && <ReviewContainer Id={Id} />}
        {showReview  && <AddReview Id={Id} />}
      </div>

      <div className="mt-4 max-w-[1300px] mx-auto px-2" ref={suggestionRef}>
        {showSuggestion &&
          product && (
            <TopSellers
              name="Suggestions"
              ProductId={Id}
              CategoryId={product.categoryId}
            />
          )}
      </div>
    </div>
  );
}
