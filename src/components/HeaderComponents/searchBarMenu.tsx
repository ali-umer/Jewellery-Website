import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  id: number;  Name: string;Image: string[];
}

interface UseSearchReturn {
  results: SearchResult[]; loading: boolean;error: string | null;
}

export function SearchBarMenu({ results, loading, error }:UseSearchReturn) {
    console.log('Results are', results);
  return (
    <div className="absolute mt-2 w-full bg-black rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto divide-y divide-[var(--gold)]/30">
      {loading && <div className="p-3 text-gray-400">Loading...</div>}
 

      {!loading && !error && results.length > 0 &&
        results.map((item) => (
          <Link key={item.id} href={`/Products/${item.id}`}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-900 transition-colors"
          >
            {item.Image?.[0] && (
              <Image
                src={item.Image[0]}
                alt={item.Name}
                width={48}
                height={48}
                className="rounded-md object-cover w-12 h-12"
              />
            )}
            <span className="text-[var(--gold)] font-medium tracking-wide">
              {item.Name}
            </span>
          </Link>
        ))}

      {!loading && !error && results.length === 0 && (
        <div className="p-3 text-gray-400">No products found</div>
      )}
    </div>
  );
}
