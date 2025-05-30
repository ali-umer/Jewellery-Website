'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 px-4"> {/* 33% width */}
      <div className="flex items-center backdrop-blur-md bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl px-4 py-3 transition focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="text-gray-500 dark:text-gray-300 w-5 h-5 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search luxury jewellery..."
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400 text-base"
        />
      </div>
    </form>
  );
}