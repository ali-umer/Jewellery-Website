"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-Upload";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorImageProps {
  color: {
    id: string;
    name: string;
    value: string;
    stock: number;
    images: File[];
  };
  onStockChange: (colorId: string, newStock: number) => void;
  onImagesChange: (colorId: string, newImages: File[]) => void;
  onRemoveColor: (colorId: string) => void;
}

export const ColorImage = ({
  color,
  onStockChange,
  onImagesChange,
  onRemoveColor,
}: ColorImageProps) => {
  const [localStock, setLocalStock] = useState(color.stock || 0);

  const handleFileUpload = (files: File[]) => {
    onImagesChange(color.id, files);
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
    <div className="w-full p-4 mb-6 border rounded-lg bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border"
            style={{ backgroundColor: color.value }}
          />
          <h3 className="font-semibold">{color.name}</h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Stock:</span>
            <input
              type="number"
              min="0"
              value={localStock}
              onChange={handleStockChange}
              className="w-20 px-2 py-1 border rounded-md text-sm"
            />
          </div>
          <button
            onClick={() => onRemoveColor(color.id)}
            className="p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3">
        {color.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {color.images.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square overflow-hidden rounded border">
                  <img
                    src={URL.createObjectURL(file)}
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
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "w-full border-2 border-dashed rounded-lg p-4 text-center",
              "border-neutral-300 bg-neutral-50"
            )}
          >
            <FileUpload onChange={handleFileUpload} />
          </div>
        )}
      </div>
    </div>
  );
};
