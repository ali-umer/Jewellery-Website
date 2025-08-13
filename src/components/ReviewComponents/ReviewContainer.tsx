"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ReviewCard from "@/components/ReviewComponents/ReviewCard";
import { useReviewController } from "@/hooks/Backend/use-Review-Controller";
import { useReview } from "@/components/ui/ReviewManage"; 

export default function ReviewContainer({Id}:{Id:number}) {
  const { reviews, loading } = useReviewController(Id);

  const {
    page,
    setPage,
    totalPages,
    visibleReviews,
    nextPage,
    prevPage
  } = useReview(reviews); // ← use the hook

  if (loading) return <p>Your Loading</p>;

  return (
    <div className="relative py-4 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="relative flex items-center justify-center mx-auto max-w-5xl ">
        {page > 0 && (
          <button
            onClick={prevPage}
            className="absolute border-amber-400 hover:border-2 left-[-40px] p-2 rounded-full bg-transparent disabled:opacity-40"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
          {visibleReviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              name={review.Name}
              rating={review.rating}
              text={review.Text}
            />
          ))}
        </div>

        {page < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="border-var[(--gold)] hover:border-2 absolute right-[-40px] p-2 rounded-full bg-transparent disabled:opacity-40"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === page ? "bg-green-600 scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
