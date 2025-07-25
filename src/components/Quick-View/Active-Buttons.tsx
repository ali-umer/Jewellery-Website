import React from "react";

export default function ActionButtons() {
  return (
    <div className="space-y-2">
        <button className="w-full hover:bg-[var(--gold)] hover:text-black text-[var(--gold)] py-2 rounded-2xl border-[var(--gold)] border-1">
            Add to cart
        </button>
        <button className="w-full border-1 border-[var(--gold)] text-[var(--gold)] py-2 rounded-2xl hover:bg-[var(--gold)] hover:text-black">
            Buy it now
        </button>
        <button className="text-sm text-[var(--gold)] underline mt-2 w-full text-left">
            View full details &rarr;
        </button>
    </div>
  );
}