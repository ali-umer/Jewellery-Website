import HamburgerButton from "@/components/HeaderComponents/HamBurger";
import Image from "next/image";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between w-full px-4 sm:px-6 py-5 bg-[#121212] border-b" style={{ borderColor: 'var(--primary)' }}>

        <div className="flex my-2 sm:my-0">
           <Image
              src="/heading.png"
              alt="Jewellery Logo"
              width={250}   
              height={45}   
              className="mx-auto mt-2"
              priority   
           />
    </div>
      <div className="flex items-center md:gap-4">
        
        <HamburgerButton />

      </div>
    </div>
  );
}