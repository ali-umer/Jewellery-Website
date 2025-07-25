"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function AddReview() {
  const [showInput, setShowInput] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleStarClick = (index) => setRating(index + 1);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload

    if (reviewText.trim()) {
      alert(`Review Submitted:\n⭐️ ${rating} stars\n💬 "${reviewText}"`);
      // Reset state
      setShowInput(false);
      setReviewText("");
      setRating(0);
      setTempRating(0);
    }
  };

  return (
    <div className="relative mt-4 text-[var(--gold)]">
      {/* Toggle Button */}
      <button
        onClick={() => setShowInput((prev) => !prev)}
        className="w-20 h-14 rounded-full bg-black text-[var(--gold)] text-2xl flex items-center justify-center absolute right-4 top-0 z-10 border-2 border-gray hover:bg-gray-900 transition"
        title="Toggle Review Input"
        type="button"
      >
        {showInput ? "−" : "+"}
      </button>

      {/* Review Form */}
      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#111] rounded-xl p-4 mt-16 text-sm"
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
                    : "stroke-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-1  bg-transparent text-white rounded-md resize-none placeholder:text-gray-400"
            rows={3}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-black border border-[var(--gold)] text-[var(--gold)] px-4 py-1 rounded-md hover:bg-[var(--gold)] hover:text-black transition-all"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}
