import React from "react";

export default function ActionButtons() {
  return (
    <div className="space-y-2">
        <button className="w-full bg-[#6c0a23] hover:bg-[#58091d] text-white py-2 rounded">
            Add to cart
        </button>
        <button className="w-full border-2 border-[#6c0a23] text-[#6c0a23] py-2 rounded hover:bg-[#f3e5eb]">
            Buy it now
        </button>
        <button className="text-sm text-[#6c0a23] underline hover:text-black mt-2 w-full text-left">
            View full details &rarr;
        </button>
    </div>
  );
}