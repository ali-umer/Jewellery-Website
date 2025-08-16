"use client";

import { useState } from "react";
import { ColorImage } from "@/components/adminComponent/colorImage";
import { Plus } from "lucide-react";

interface ColorVariant {
  id: string;
  name: string;
  value: string;
  stock: number;
  images: File[];
}

export default function ProductColorManager({ id, submit }) {
  const [colors, setColors] = useState<ColorVariant[]>([
    {
      id: "1",
      name: "Red",
      value: "#ff0000",
      stock: 10,
      images: [],
    },
  ]);

  const handleAddColor = () => {
    const newColor: ColorVariant = {
      id: Date.now().toString(),
      name: `Color ${colors.length + 1}`,
      value: "#" + Math.floor(Math.random() * 16777215).toString(16),
      stock: 0,
      images: [],
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
      Images: color.images // This should remain as File[]
    }));

    try {
      await submit(id, formattedColors);
      // Optionally show success message or reset form
    } catch (error) {
      console.error("Failed to submit colors:", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        {colors.map((color) => (
          <ColorImage
            key={color.id}
            color={color}
            onStockChange={handleStockChange}
            onImagesChange={handleImagesChange}
            onRemoveColor={handleRemoveColor}
          />
        ))}

        <div className="flex gap-4">
          <button
            onClick={handleAddColor}
            className="flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors w-full justify-center"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Color Variant</span>
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-1/3 justify-center"
          >
            Save Colors
          </button>
        </div>
      </div>
    </div>
  );
}