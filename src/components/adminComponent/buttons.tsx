"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductForm from "./inputProduct";
import EditProductForm from "./editProductDetails"; 
import SearchBar from "../HeaderComponents/SearchBar";


export default function CircleButtonGroup() {
  const options = ["New Product", "Edit Product", "Delete Product"];
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleClick = (action: string) => {
    console.log("Clicked:", action);
    setSelectedAction(action);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[50vh] pt-16 md:pt-0">
   
      <div className="flex flex-col md:flex-row items-center justify-center relative">
        {options.map((label, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center 
                         font-sans font-semibold tracking-wide
                         text-lg shadow-xl 
                         bg-[var(--gold)] text-black 
                         hover:shadow-2xl hover:scale-105 transition"
              onClick={() => handleClick(label)}
            >
              {label}
            </motion.button>

            {i !== options.length - 1 && (
              <>
                {/* Desktop: horizontal line */}
                <div className="hidden md:block w-60 h-[2px] bg-gray-100" />
                {/* Mobile: vertical line */}
                <div className="block md:hidden w-[2px] h-16 bg-gray-100 mx-auto" />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Conditionally render components based on selectedAction */}
      <div className="mt-8">
        {selectedAction === "New Product" && <ProductForm />}
        {selectedAction === "Edit Product" && <SearchBar mode={"edit"} />}
        {selectedAction === "Delete Product" && <SearchBar mode={"delete"} />}
      </div>
    </div>
  );
}
