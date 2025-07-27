import { useState, useEffect } from "react";

export default function useProductController({ product, productVariants }) {
  const initialColor = product?.colors?.[0] ?? "";
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [activeImages, setActiveImages] = useState(productVariants[initialColor] ?? []);

  useEffect(() => {
    setActiveImages(productVariants[selectedColor] ?? []);
  }, [selectedColor, productVariants]);

  return {
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    activeImages
  };
}
