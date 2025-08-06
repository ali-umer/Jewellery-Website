"use client";
import { useRouter, useParams} from "next/navigation";
import StarryComponent from "@/components/ui/StarryComponent";
import TopBar from "@/components/TopBar";
import ProductPage from "@/components/ProductComponents/ProductPage";
import {useProduct} from "@/hooks/use-product";




export default function CategoryPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10); 
  
  const { product, loading, error } = useProduct(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;


  return (
    <div className="w-full min-h-screen">
          <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
              <StarryComponent />
              <TopBar />
              <ProductPage Id={product.id} name={product.Name} price={product.Price} description={product.Description} />
              
              
    
       </div>
   
  );
}


