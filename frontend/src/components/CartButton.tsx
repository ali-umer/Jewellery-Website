'use client';

import { ShoppingCart } from 'lucide-react';

export default function CartButton({ count = 0 }: { count: number }) {
    return (
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-white" />

            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {count}
                </span>
            )}
        </button>
    );
}