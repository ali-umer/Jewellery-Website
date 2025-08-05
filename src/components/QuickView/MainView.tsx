"use client";

import ImagesSection from "@/components/QuickView/ImageComponent";
import ColorSelector from "@/components/QuickView/ColorsComponent";
import QuantityControl from "@/components/QuickView/QuantityControl";
import ActionButtons from "@/components/QuickView/ActiveButtons";
import DetailsSection from "@/components/QuickView/ProductDetails";
import useProductController from "@/hooks/use-Product-Controller";

interface QuickViewProps {
  productId: number;
  name: string;
  price: number;
  discount: number;
  handleView: (open: boolean) => void;
}

export default function QuickView({ productId, name, price, discount, handleView }: QuickViewProps) {
  const {
  quantity,
  setQuantity,
  colors,  // ✅ Already returns Object.keys() in the hook
  activeColor,
  setActiveColor,
  activeImages,
  isLoading
} = useProductController({ product_id: 2 });

  if (isLoading) return <div className="p-10 text-white">Loading product...</div>;
  console.log("🔥 Active images in QuickView:", activeImages);

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 rounded-lg max-w-5xl mx-auto shadow-md gap-2 
                    bg-red-900 w-[95%] md:w-auto min-h-screen md:min-h-fit relative">

      {/* Cross button */}
      <button
        className="absolute top-4 right-4 text-white bg-black bg-opacity-30 hover:bg-opacity-50 
                   p-2 rounded-full z-50"
        onClick={() => handleView(false)}
      >
        ✕
      </button>

     

      <ImagesSection images={activeImages} />

        <div className="md:w-[54%] p-6 space-y-3 bg-transparent rounded-xl shadow-lg border border-amber-100 flex flex-col justify-center">
        <DetailsSection name={name} price={price} discount={discount} />
        <ColorSelector colors={colors} activeColor={activeColor} onChange={setActiveColor} />
        <QuantityControl quantity={quantity} setQuantity={setQuantity} QuickView={true} />
        <ActionButtons />
      </div>
    </div>
  );
}