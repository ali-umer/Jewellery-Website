interface ProductDetailsProps {
  name: string;
  description:string | null;
  price: number;
  discount?: number;
}

export function ProductDetails({name,price,discount=0,description,}: ProductDetailsProps) {
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="md:col-span-1 gap-2">
      <h2 className="text-lg font-bold text-var[--(gold)]">{name} </h2>
      <p className="text-sm text-white mt-1 line-clamp-3">
        {description}
      </p>

      {discount > 0 ? (
        <div className="mt-2">
              <span className="text-sm text-gray-400 line-through">Rs. {price}</span>
              <span className="text-medium text-amber-50 font-medium ml-2">
                Rs. {discountedPrice.toFixed(0)}
              </span>
              <span className="ml-2 text-green-400 text-sm">(-{discount}%)</span>
        </div>
      ) : (
        <p className="text-medium text-amber-50 font-medium mt-2">Rs. {price.toFixed(1)}</p>
      )}
    </div>
  );
}
