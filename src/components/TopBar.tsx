import HamburgerButton from "@/components/HeaderComponents/HamBurger";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between w-full px-4 sm:px-6 py-5 bg-[#121212] border-b" style={{ borderColor: 'var(--primary)' }}>

      <div className="flex my-2 sm:my-0">
        <img
          src="heading.png"
          alt="Jewellery Logo"
          className="mx-auto mt-2 w-90 h-10"
        />
      </div>
      <div className="flex items-center md:gap-4">
        
        <HamburgerButton />

      </div>
    </div>
  );
}