"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { addReview } from "@/hooks/Backend/add-a-review";
import UserMessage from "@/components/userMessages";

export default function AddReview({ Id }: { Id: number }) {
  const [showInput, setShowInput] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [userMessage, setUserMessage] = useState("");

  const handleStarClick = (index = 0) => setRating(index + 1);

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();
    const success = await addReview({ productId: Id, rating, reviewText });

    if (success) {
      setUserMessage("Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setShowInput(false);
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="flex items-start w-full md:w-[75%] text-[var(--gold)] relative mt-4">
      <button
        onClick={() => setShowInput((prev) => !prev)}
        className="text-[var(--gold)] mr-4 mt-2"
        title="Toggle Review Input"
        type="button"
      >
        {showInput ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
      </button>

      {/* Review Form */}
      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-4 w-full text-black shadow-md"
        >
          {/* Star Rating */}
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => handleStarClick(i)}
                onMouseEnter={() => setTempRating(i + 1)}
                onMouseLeave={() => setTempRating(0)}
                className={`w-6 h-6 cursor-pointer transition-all duration-150 ${
                  (tempRating || rating) > i
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-2 bg-white border border-gray-300 text-black rounded-md resize-none placeholder:text-gray-400"
            rows={4}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-black border border-[var(--gold)] text-[var(--gold)] px-4 py-1 rounded-md hover:bg-[var(--gold)] hover:text-black transition-all"
          >
            Submit
          </button>
        </form>
      )}

      {/* User Message */}
      {userMessage && (
        <div className="ml-4 mt-2 w-full">
          <UserMessage message={userMessage} success={true} />
        </div>
      )}
    </div>
  );
}
