"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/Backend/use-Search-Query";
import { SearchBarMenu } from "./searchBarMenu";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearch(query);

  return (
    <div className="relative w-72">
      <form
        onSubmit={(e) => {  e.preventDefault(); }}
      >
        <div className="flex items-center rounded-2xl px-4 py-3 border border-gray-300 focus-within:ring-2 focus-within:ring-[var(--gold)]">
          <Search className="text-gray-500 w-5 h-5 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artificial jewellery..."
            className="flex-1 bg-transparent outline-none text-white-800 placeholder-gray-400 text-base"
          />
        </div>
      </form>

      {/* Dropdown */}
      {query && <SearchBarMenu results={results} loading={loading} error={error} /> }
    </div>
  );
}
