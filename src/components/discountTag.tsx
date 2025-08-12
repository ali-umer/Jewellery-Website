export function DiscountTag({ discount }: { discount: number }) {
  return (
    <div
      className="absolute top-21 right-2 z-30"
      style={{
        transform: "translate(50%, -50%)",
      }}
    >
      <div className="relative w-65 h-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full fill-[var(--gold)] drop-shadow-lg"
        >
          <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
        </svg>
        <span
          className="absolute inset-0 flex flex-col items-center justify-center 
          text-white text-lg sm:text-xl font-extrabold tracking-wide uppercase 
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-playfair-display"
        >
          <span>{discount}%</span>
          <span>OFF</span>
        </span>
      </div>
    </div>
  );
}


