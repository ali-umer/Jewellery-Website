import Image from "next/image"
import { NavigateFooter } from "@/components/Footer/Navigate";
import {SocialMedia} from "@/components/Footer/SocialMedia"


export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white px-6 md:px-20 py-20 text-[17px] leading-relaxed">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-12">
      
        <div className="flex flex-col items-start gap-3">
            <Image
              src="/heading.png"
              alt="Jewellery Logo"
              width={90}
              height={40}
               className="mt-2 w-90 h-10"
              priority
            />
       </div>


        
        <div className="mt-11">
          <p className="max-w-xs">
            We craft and sell stunning artificial jewellery including rings,
            necklaces, earrings, and much more to elevate your elegance.
          </p>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[var(--gold)]">Contact</h3>
          <p>Email: PashaJwellery.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Address: Street 21, Block A, Lahore, Pakistan</p>
        </div>

        {/* Column 4: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-[var(--gold)]">NAVIGATE</h3>
         <NavigateFooter />
        </div>
      </div>

      {/* Follow Us + Copyright */}
      <div className="flex flex-col items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-3 text-center text-[var(--gold)]">Follow Us</h3>
          <SocialMedia />
        
        </div>
        <p className="text-sm text-center mt-4">© {new Date().getFullYear()} Pasha Jewellery. All rights reserved.</p>
      </div>
    </footer>
  );
}
