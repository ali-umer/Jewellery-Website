"use client";
import { useRouter, useParams } from "next/navigation";
import StarryComponent from "@/components/ui/StarryComponent";
import TopBar from "@/components/TopBar";
import ProductPage from "@/components/ProductComponents/ProductPage";



  const product = {
    title: "Elegant Necklace",
    price: "299",
    colors: ["#FF5733", "#33FF57", "#3357FF"],
    images: ["image1.jpg", "image2.jpg"], 
  };

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const Product = (params.Product_Name)?.toString().replaceAll('%20', ' ');


  return (
    <div className="w-full min-h-screen">
          <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
              <StarryComponent />
              <TopBar />
              <ProductPage />
              
              
    
       </div>
   
  );
}


