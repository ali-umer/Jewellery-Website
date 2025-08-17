"use client";

import { useState } from "react";
import { ColorImage } from "@/components/adminComponent/colorImage";
import { Plus } from "lucide-react";

interface ColorVariant {
  id:string;
  name:string;
  stock:number ;
  images:File[];
}

export default function ProductColorManager({ id, submit }) {
  const [colors, setColors] = useState<ColorVariant[]>([]);
 

  const handleAddColor = () => {
  const newColor: ColorVariant = {
    id: Date.now().toString(), 
    name:'',
    stock:1,
    images:[]

  };
  setColors([...colors, newColor]);
};


  const handleStockChange = (colorId: string, newStock: number) => {
    setColors(
      colors.map((color) =>
        color.id === colorId ? { ...color, stock: newStock } : color
      )
    );
  };

  const handleImagesChange = (colorId: string, newImages: File[]) => {
    setColors(
      colors.map((color) =>
        color.id === colorId ? { ...color, images: newImages } : color
      )
    );
  };

  const handleRemoveColor = (colorId: string) => {
    setColors(colors.filter((color) => color.id !== colorId));
  };

  const handleSubmit = async () => {
    // Format the data for the insertColorsWithImages function
    const formattedColors = colors.map(color => ({
      Color: color.name,
      Stock: color.stock,
      Images: color.images // This should remain as File[
    }));

    try {
      await submit(id, formattedColors);
      // Optionally show success message or reset form
    } catch (error) {
      console.error("Failed to submit colors:", error);
      // Handle error (show toast, etc.)
    }
  };


  const handleNameChange = (colorId: string, newName: string) => {
  setColors(
    colors.map((color) =>
      color.id === colorId ? { ...color, name: newName } : color
    )
  );
};

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        {colors.map((color) => (
          <ColorImage
                key={color.id}
                color={color}
                onNameChange={handleNameChange}
                onStockChange={handleStockChange}
                onImagesChange={handleImagesChange}
                onRemoveColor={handleRemoveColor}
              />

        ))}

      <div className="flex flex-col items-center gap-3 mt-2">
          <button
            onClick={handleAddColor}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--gold)] text-[var(--gold)]">
                      
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Variant</span>
          </button>

          {
          colors.length >0 &&
            <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold 
                      rounded-xl shadow-lg"
          >
            Save
          </button>
        } 
     </div>

      </div>
    </div>
  );
}