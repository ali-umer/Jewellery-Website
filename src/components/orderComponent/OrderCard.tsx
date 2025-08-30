
import ProductRow from '@/components/orderComponent/productRow';
import { getOrderDetails } from "@/hooks/Backend/get-Order-Details";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}


export default function OrderCard({
  orderId,
  Total,
  Date,
}: {
  orderId: number;
  Total: number;
  Date: string;
}) {
  const { products, loading, error } = getOrderDetails(orderId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">

      {/* Column headers */}
      <div className="flex items-center pb-4 border-b">
        <div className="w-20 flex-shrink-0 mr-4"></div>
        <div className="w-[40%] font-medium text-gray-500">Name</div>
        <div className="w-[20%] font-medium text-gray-500">Price</div>
        <div className="w-[20%] text-center font-medium text-gray-500">
          Quantity
        </div>
        <div className="w-[20%] text-right font-medium text-gray-500">Total</div>
      </div>

      {/* Products */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-4">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No products found</p>
        ) : (
          products.map((product) => (
            <ProductRow
              key={product.id}
              productId={product.id}
              name={product.name}
              image={product.image}
              quantity={product.quantity}
              price={product.price}
            />
          ))
        )}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t flex justify-end items-center gap-4">
        <span className="font-medium text-gray-500">Order Total:</span>
        <span className="text-lg font-semibold text-gray-900">
          {Total}
        </span>
      </div>
    </div>
  );
}


