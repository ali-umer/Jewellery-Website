'use client';

import { useState}from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import CartButton from "@/components/CartButton"
import Profile from './Profile';


export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleCart = () => {
    router.push('/cart');
    setIsOpen(false);
  };  

const handleCategory = () => {
 
};


  return (
    <>
  
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md transition ml-5"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

    
      <div className="hidden md:flex items-center gap-4">
        <CartButton count={3} handleCart={handleCart} />
        <SearchBar />    
        <Profile />
      </div>
     
      {isOpen && ( <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}/>
      )}

      
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl`}
      >

   
        <div className="p-4 space-y-6 mt-5">
          <SearchBar />
          
          
          <div className="flex flex-col space-y-4">
        
          <button className="flex items-center justify-between p-2 rounded transition" onClick={()=>handleCategory()}>
              <span className="text-var(--gold)">Categories</span>
            </button>
          </div>

          
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <CartButton count={3} mobile handleCart={handleCart} />
              
            </div>
          </div>

             <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
             < Profile />
              
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}