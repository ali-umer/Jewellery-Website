"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/Backend/use-Search-Query";
import { SearchBarMenu } from "./searchBarMenu";
import EditSectionTabs from "../adminComponent/editButtons";

interface SearchBarProps {
  mode?: "default" | "edit" | "delete";
}

export default function SearchBar({ mode = "default" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { results, loading, error } = useSearch(query);

  const inputClasses =
    mode === "default" ? "w-72" : "w-[28rem] md:w-[32rem]";

  return (
    <>
      {/* Search input + dropdown */}
      <div className={`relative ${inputClasses}`}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center rounded-2xl px-4 py-3 border border-gray-300 focus-within:ring-2 focus-within:ring-[var(--gold)]">
            <Search className="text-gray-500 w-5 h-5 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                mode === "edit"
                  ? "Search product to edit..."
                  : mode === "delete"
                  ? "Search product to delete..."
                  : "Search artificial jewellery..."
              }
              className="flex-1 bg-transparent outline-none text-white-800 placeholder-gray-400 text-base"
            />
          </div>
        </form>

        {/* Dropdown menu */}
        {query && (
          <SearchBarMenu
            results={results}
            loading={loading}
            error={error}
            mode={mode}
            onEdit={(id) => setEditingId(id)} // <-- pass callback
          />
        )}
      </div>

      {/* Show edit section only after selecting product */}
      {mode === "edit" && editingId && (
        <div className="mt-8 w-full max-w-4xl mx-auto">
          <EditSectionTabs
            productId={editingId}
                     />
        </div>
      )}
    </>
  );
}
