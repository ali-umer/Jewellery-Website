"use client";

import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/hooks/Backend/use-Product-Delete";
import { Trash } from "lucide-react";  // ✅ correct import

interface SearchResult {
  id: number;
  Name: string;
  Image: string;
}

interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  mode?: "default" | "edit" | "delete";
  onEdit?: (id: number) => void; // <-- callback for edit
}

export function SearchBarMenu({
  results,
  loading,
  error,
  mode = "default",
  onEdit,
}: UseSearchReturn) {
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      console.log(`Deleted product ${id}`);
      // TODO: trigger refresh or re-fetch after delete
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="absolute mt-2 w-full bg-black rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto divide-y divide-[var(--gold)]/30">
      {loading && <div className="p-3 text-gray-400">Loading...</div>}

      {!loading &&
        !error &&
        results.length > 0 &&
        results.map((item) => {
          const imageSize = mode === "default" ? 48 : 80;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 px-4 py-3 hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/Products/${item.id}`}
                  className="flex items-center gap-3"
                >
                  {item.Image && (
                    <Image
                      src={item.Image}
                      alt={item.Name}
                      width={imageSize}
                      height={imageSize}
                      className={`rounded-md object-cover ${
                        mode === "default" ? "w-12 h-12" : "w-20 h-20"
                      }`}
                    />
                  )}
                  <span className="text-[var(--gold)] font-medium tracking-wide">
                    {item.Name}
                  </span>
                </Link>

                {/* Action buttons */}
                {mode === "edit" && (
                  <button
                    onClick={() => onEdit?.(item.id)} // <-- notify parent
                    className="px-3 py-1 text-sm rounded-lg bg-[var(--gold)] text-black font-semibold hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}
                {mode === "delete" && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-white hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash className="w-5 h-5" /> {/* ✅ trash icon */}
                  </button>
                )}
              </div>
            </div>
          );
        })}

      {!loading && !error && results.length === 0 && (
        <div className="p-3 text-gray-400">No products found</div>
      )}
    </div>
  );
}