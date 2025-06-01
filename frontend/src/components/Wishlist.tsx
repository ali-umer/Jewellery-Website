'use client';

import { Heart } from 'lucide-react';

export default function WishlistButton() {
    return (
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Heart className="w-6 h-6 text-white" />
        </button>
    );
}