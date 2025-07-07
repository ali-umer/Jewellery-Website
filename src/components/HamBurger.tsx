'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition ml-5"
        aria-label="Open menu"
      >
        <Menu />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}


      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-4 mt-5">
        <SearchBar/>
         
        </nav>
      </div>
    </>
  );
}