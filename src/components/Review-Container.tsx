"use client";

import { Star } from "lucide-react"; // or use your own star icon

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

const ReviewCard = ({ name, rating, text }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <div className="flex text-yellow-400 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        {text.split(" ").slice(0, 60).join(" ")}{/* trims to 60 words */}
      </p>
    </div>
  );
};

export default function ReviewContainer() {
  return (
    <div className="flex justify-center py-6 px-4 justify-content-center place-items-center">
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
    </div>
  );
}
