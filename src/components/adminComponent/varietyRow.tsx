"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-Upload";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorImageProps {
  color: {
    id: number;
    name: string;
    stock: number;
    images: (string | File)[];
  };
  onNameChange: (colorId: number, newName: string) => void;
  onStockChange: (colorId: number, newStock: number) => void;
  onImagesChange: (colorId: number, newImages: (string | File)[]) => void;
  onRemoveColor: (colorId: number) => void;
}

export const ColorImage = ({
  color,
  onNameChange,
  onStockChange,
  onImagesChange,
  onRemoveColor,
}: ColorImageProps) => {
  const [localStock, setLocalStock] = useState(color.stock || 0);

  const handleFileUpload = (files: File[]) => {
    // merge with existing images instead of replacing
    onImagesChange(color.id, [...color.images, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = color.images.filter((_, i) => i !== index);
    onImagesChange(color.id, newImages);
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStock = parseInt(e.target.value) || 0;
    setLocalStock(newStock);
    onStockChange(color.id, newStock);
  };

  return (
    <div className="w-full p-4 mb-6 border rounded-lg bg-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <input
            type="text"
            value={color.name}
            onChange={(e) => onNameChange(color.id, e.target.value)}
            placeholder="Variety Name"
            className="w-40 px-2 py-1 border rounded-md text-sm text-[var(--gold)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={localStock}
            onChange={handleStockChange}
            placeholder="Stock"
            className="w-20 px-2 py-1 border rounded-md text-[var(--gold)] text-sm placeholder-[var(--gold)]"
          />
        </div>

        <button
          onClick={() => onRemoveColor(color.id)}
          className="p-2 text-[var(--gold)] rounded-full"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {/* Images */}
      <div className="space-y-3">
        {color.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {color.images.map((img, index) => {
              const src =
                typeof img === "string" ? img : URL.createObjectURL(img);
              return (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded border">
                    <img
                      src={src}
                      alt={`${color.name} variant ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Always show uploader */}
        <div
          className={cn(
            "w-full border-2 border-dashed rounded-lg p-4 text-center h-full",
            "border-neutral-300 bg-neutral-50"
          )}
        >
          <FileUpload onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};
