'use client';

import Image from 'next/image';

export default function Card() {
  return (
    <div className="relative w-40 md:w-60 lg:w-60 h-60 sm:h-60 md:h-80 lg:h-80 overflow-hidden shadow-3xl bg-gray-100 mb-0">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="300" cy="400" r="200" stroke="#D1D5DB" strokeWidth="1" />
        <circle cx="300" cy="400" r="150" stroke="#D1D5DB" strokeWidth="2" />
        <circle cx="300" cy="400" r="100" stroke="#D1D5DB" strokeWidth="3" />

        <circle cx="10" cy="10" r="250" stroke="#D1D5DB" strokeWidth="1" />
        <circle cx="10" cy="10" r="200" stroke="#D1D5DB" strokeWidth="2" />
        <circle cx="10" cy="10" r="150" stroke="#D1D5DB" strokeWidth="3" />
      </svg>
    </div>
  );
}