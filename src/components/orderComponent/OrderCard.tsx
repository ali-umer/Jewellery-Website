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
    <div className="bg-transparent rounded-3xl shadow-lg p-6">

      {/* Column headers */}
      <div className="flex items-center pb-3 border-b border-gray-700">
        <div className="w-20 flex-shrink-0 mr-4 text-[var(--gold)]">Product</div>
        <div className="w-[40%] font-medium text-[var(--gold)]">Name</div>
        <div className="w-[20%] font-medium text-[var(--gold)]">Price</div>
        <div className="w-[18%] text-center font-medium text-[var(--gold)]">
          Quantity
        </div>
        <div className="w-[18%] text-right font-medium text-[var(--gold)]">
          Total
        </div>
      </div>

      {/* Products */}
      <div className="mt-3 space-y-3">
        {loading ? (
          <p className="text-[var(--gold)] text-center py-2">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-2">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-[var(--gold)] text-center py-2">No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-red-900 rounded-2xl shadow-md hover:shadow-lg transition p-3"
            >
              <ProductRow
                productId={product.id}
                name={product.name}
                image={product.image}
                quantity={product.quantity}
                price={product.price}
              />
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end items-center gap-2">
        <span className="font-medium text-[var(--gold)]">Order Total:</span>
        <span className="text-2xl font-bold text-[var(--gold)]">
         
        </span>
      </div>
    </div>
  );
}
