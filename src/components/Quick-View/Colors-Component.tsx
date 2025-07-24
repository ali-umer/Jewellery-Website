import React from "react";

interface ColorSelectorProps {
  colors: string[];
  activeColor: string;
  onChange: (color: string) => void;
}

export default function ColorSelector({ colors, activeColor, onChange }: ColorSelectorProps) {
  return (
    <div>
      <p className="font-medium mb-2">Color</p>
      <div className="relative flex flex-wrap gap-2 font-bold text-[#6c0a23]">
        {colors.map((color) => (
          <button key={color}  onClick={() => onChange(color)}
            className={`px-3 py-1 rounded-full text-sm capitalize border ${
              activeColor === color ? "bg-black text-white" : "bg-gray-100 text-black"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}