"use client";

interface ProductDetailsProps {
  name: string;
  price: number;
}

export default function ProductDetails({ name, price }: ProductDetailsProps) {
  return (
    <div className="md:col-span-1">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-lg font-medium mt-1">Rs. {price}</p>
    </div>
  );
}
