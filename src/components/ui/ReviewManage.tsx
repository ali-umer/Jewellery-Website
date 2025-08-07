"use client";
import { useEffect, useState } from "react";

export const useReview = (reviews: any[]) => {
    
  const getCardsPerPage = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => {
      const newCount = getCardsPerPage();
      if (newCount !== cardsPerPage) {
            setCardsPerPage(newCount);
            setPage(0); 
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

  return {
    page,
    setPage,
    totalPages,
    visibleReviews,
    nextPage,
    prevPage
  };
};
