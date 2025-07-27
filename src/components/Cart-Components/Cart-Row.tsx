"use client";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartRow({ item, onDelete }) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#111] border border-yellow-600 rounded-xl p-4 gap-6 hover:shadow-yellow-600/40 hover:shadow-lg transition">
      <Link href={`/product/${item.slug}`} className="w-full md:w-1/4">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-xl object-cover w-full h-48 md:h-32 hover:scale-105 transition-transform duration-200"
        />
      </Link>
     
      <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="mt-1">Quantity: {item.quantity}</p>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-2 md:mt-0">
          <span className="text-lg font-medium">Rs. {item.price}</span>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-400"
            title="Remove from cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
