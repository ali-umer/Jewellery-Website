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
      <div className="relative flex flex-wrap gap-2 font-bold text-[var(--gold)]">
        {colors.map((color) => (
             <button key={color}  onClick={() => onChange(color)}
            className={`px-5 py-2 rounded-full text-base capitalize border font-semibold ${
              activeColor === color ? "bg-[var(--gold)] text-black": "text-[var(--gold)] border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black border-1"
            }`}
          >
            {color}
          </button>

        ))}
      </div>
    </div>
  );
}