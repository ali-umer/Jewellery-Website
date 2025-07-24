import ProductCard from "@/components/Product-Card";

const sampleData = [
  {
    name: "Elegant Necklace",
    price: "$299",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"]
  },
  {
    name: "NY Skyline Print",
    price: "$120",
    images: ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"],
  },
  {
    name: "Lion Portrait",
    price: "$350",
    images: ["https://images.unsplash.com/photo-1456926631375-92c8ce872def"],
  },
  {
    name: "Healthy Bowl",
    price: "$85",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c"],
  },
  {
    name: "Mountain Art",
    price: "$199",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
  },
];

export default function ProductCardGrid({Display=""}) {
  return (
   <>
    <h3 className="center text-center justify-content-center pt-12  text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)] tracking-tight font-playfair-display">
                    {Display}
        </h3>
    <div className="w-full px-4 py-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-center justify-items-center align-items-center">
        {sampleData.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            images={product.images}
          />
        ))}
      </div>
    </div>
    </>
  );
}

