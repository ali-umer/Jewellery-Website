import Image from 'next/image';
import Link from 'next/link';

interface ProductRowProps {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export default function ProductRow({ productId, name, image, quantity, price }: ProductRowProps) {
  const total = price * quantity;

  return (
    <div className="py-4 flex items-center">
      <Link href={`/Products/${productId}`} className="w-20 flex-shrink-0 mr-4">
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      </Link>

      {/* Name Column - w-[40%] to match header */}
      <div className="w-[40%]">
        <Link href={`/Products/${productId}`}>
          <h3 className="font-medium text-[var(--gold)]">
            {name}
          </h3>
        </Link>
      </div>

      {/* Price Column - w-[20%] to match header */}
      <div className="w-[20%] text-var[--(gold)]">
        ₹{price.toLocaleString()}
      </div>

      {/* Quantity Column - w-[20%] to match header */}
      <div className="w-[20%] text-center text-var[(--gold)]">
        {quantity}
      </div>

      {/* Total Column - w-[20%] to match header */}
      <div className="w-[20%] text-right font-medium text-var[--(gold)]">
        ₹{total.toLocaleString()}
      </div>
    </div>
  );
}