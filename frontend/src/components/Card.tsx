'use client';

import Image from 'next/image';

export default function Card() {
  return (
    <div className="relative w-80 rounded-3xl overflow-hidden shadow-md bg-gray-100">
      {/* Background SVG Lines */}
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

      <div className="w-50 h-100 p-4">
        <div className="rounded-xl overflow-hidden mb-4">
      
        </div>
        <h2 className="text-2xl font-medium text-gray-800">Track your expenses</h2>
      </div>
    </div>
  );
}