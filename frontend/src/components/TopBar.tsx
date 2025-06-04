import SearchBar from "@/components/SearchBar";
import CartButton from "@/components/CartButton";
import Wishlist from "@/components/Wishlist";
import HamburgerButton from "@/components/HamBurger";

export default function TopBar() {
  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 sm:px-6 py-5 bg-[#121212] border-b" style={{ borderColor: 'var(--gold)' }}>
      
      {/* Left: Hamburger */}
      <div className="flex items-center">
        <HamburgerButton />
      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center my-2 sm:my-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-wide font-semibold text-[var(--gold)] uppercase font-serif leading-tight">
          Pasha <span className="text-white">Jewellery</span>
        </h1>
      </div>

      {/* Right: Wishlist + Cart */}
      <div className="flex items-center gap-4">
        <Wishlist />
        <CartButton count={3} />
      </div>
    </div>
  );
}