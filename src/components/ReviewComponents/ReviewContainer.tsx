"use client";

import { Star,ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState,useEffect } from "react";
import ReviewCard from "@/components/ReviewComponents/ReviewCard";
const reviews = [
  {
    name: "Alice Smith",
    rating: 5,
    text: "This product exceeded my expectations. It’s durable, elegant, and works exactly as advertised. The delivery was fast too.",
  },
  {
    name: "John Doe",
    rating: 4,
    text: "Very good experience overall. Quality was top-notch. Just a minor packaging issue but nothing serious.",
  },
  {
    name: "Emma Johnson",
    rating: 5,
    text: "Outstanding service! I’ve never had such a smooth transaction before. Highly recommend to anyone looking for reliability.",
  },
  {
    name: "Liam Brown",
    rating: 3,
    text: "It's decent for the price. Some parts feel a bit cheap but gets the job done.",
  }, {
    name: "Alice Smith",
    rating: 5,
    text: "This product exceeded my expectations. It’s durable, elegant, and works exactly as advertised. The delivery was fast too.",
  },
  {
    name: "John Doe",
    rating: 4,
    text: "Very good experience overall. Quality was top-notch. Just a minor packaging issue but nothing serious.",
  },
  {
    name: "Emma Johnson",
    rating: 5,
    text: "Outstanding service! I’ve never had such a smooth transaction before. Highly recommend to anyone looking for reliability.",
  }
];



export default function ReviewContainer() {
  const [page, setPage] = useState(0);

  // Detect responsive cards per page
  const getCardsPerPage = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => {
      const newCount = getCardsPerPage();
      if (newCount !== cardsPerPage) {
        setCardsPerPage(newCount);
        setPage(0); // reset to avoid out-of-bound page
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardsPerPage]);

  const totalPages = Math.ceil(reviews.length / cardsPerPage);
  const start = page * cardsPerPage;
  const visibleReviews = reviews.slice(start, start + cardsPerPage);

  const nextPage = () => {
    if (page < totalPages - 1) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((p) => p - 1);
  };


  return (
  <div className="relative py-4 px-4 sm:px-6 md:px-10 lg:px-20">

 
  <div className="relative flex items-center justify-center mx-auto max-w-5xl ">
      {page > 0 && (
        <button onClick={prevPage} className="absolute border-amber-400 hover:border-2 left-[-40px] p-2 rounded-full bg-transparent disabled:opacity-40">
          <ChevronLeft size={24} />
        </button>
      )}

      
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
        {visibleReviews.map((review, idx) => (
          <ReviewCard key={start + idx} {...review} />
        ))}
      </div>

      {page < totalPages - 1 && (
        <button onClick={nextPage} className="border-amber-400 hover:border-2 absolute right-[-40px] p-2 rounded-full bg-transparent disabled:opacity-40">
          <ChevronRight size={24} />
        </button>
      )}

</div>


    {/* Progress Dots */}
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