"use client";

import { useState, useEffect } from "react";
import { ColorImage } from "@/components/adminComponent/varietyRow";
import { Plus } from "lucide-react";
import { getColorVariants } from "@/hooks/Backend/get-Color-Variant";
import {  updateColorVariant,  addColorVariant,  deleteColorVariant,
} from "@/hooks/Backend/update-Color-Variant";
import UserMessage from '../userMessages';

interface ColorVariant {
  id: number;
  name: string;
  stock: number;
  images: (string | File)[];
  dirty?: boolean;   // changed locally
  isNew?: boolean;   // not yet saved in DB
  isDeleted?: boolean; // marked for deletion
}

interface ColorParentProps {
  productId: number;
}

export default function ColorParent({ productId }: ColorParentProps) {
  const [colors, setColors] = useState<ColorVariant[]>([]);
const [message, setMessage] = useState<{ message: string; success: boolean } | null>(null);

  // Fetch initial colors
  useEffect(() => {
    const fetchData = async () => {
      const data = await getColorVariants(productId);
      if (data) {
        setColors(data.map((c: ColorVariant) => ({
          ...c,
          dirty: false,
          isNew: false,
          isDeleted: false,
        })));
      }
    };
    fetchData();
  }, [productId]);

  // Just add locally (don’t call API yet)
  const handleAddColor = () => {
    const newColor: ColorVariant = {
      id: Date.now(), // temporary ID
      name: "",
      stock: 1,
      images: [],
      dirty: true,
      isNew: true,
      isDeleted: false,
    };
    setColors([...colors, newColor]);
  };

  const handleNameChange = (colorId: number, newName: string) => {
    setColors(colors.map(c =>
      c.id === colorId ? { ...c, name: newName, dirty: true } : c
    ));
  };

  const handleStockChange = (colorId: number, newStock: number) => {
    setColors(colors.map(c =>
      c.id === colorId ? { ...c, stock: newStock, dirty: true } : c
    ));
  };

  const handleImagesChange = (colorId: number, newImages: (string | File)[]) => {
    setColors(colors.map(c =>
      c.id === colorId ? { ...c, images: newImages, dirty: true } : c
    ));
  };

  // Instead of deleting immediately, mark for deletion
  const handleRemoveColor = (colorId: number) => {
    setColors(colors.map(c =>
      c.id === colorId
        ? { ...c, isDeleted: true, dirty: true }
        : c
    ));
  };

  // Save handler for all dirty colors
  const handleSubmit = async () => {
    const dirtyColors = colors.filter(c => c.dirty);

    for (const color of dirtyColors) {
      if (color.isDeleted) {
        
        if (color.isNew) {
          setColors(prev => prev.filter(c => c.id !== color.id));
        } else {
           await deleteColorVariant(productId, color.id);
  
        }
      } else if (color.isNew) {
      
        const added = await addColorVariant(
          productId,
          color.name,
          color.stock,
          color.images as File[]
        );

      } else {
        await updateColorVariant(productId, color);
      }
    }

    setMessage({ message: "Changes saved successfully!", success: true });
    setColors([]);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="space-y-6">
      {message && (
          <div className="p-3">
            <UserMessage message={message.message} success={message.success} />
          </div>
        )}
        {colors.filter(c => !c.isDeleted).map(color => (
          <ColorImage
            key={color.id}
            color={color}
            onNameChange={handleNameChange}
            onStockChange={handleStockChange}
            onImagesChange={handleImagesChange}
            onRemoveColor={handleRemoveColor}
          />
        ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddColor}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--gold)] text-[var(--gold)]"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Variant</span>
          </button>
        </div>
      </div>

      {colors.some(c => c.dirty) && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold rounded-xl shadow-lg"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
