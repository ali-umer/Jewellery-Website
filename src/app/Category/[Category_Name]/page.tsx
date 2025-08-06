"use client";
import { useRouter, useParams } from "next/navigation";
import StarryComponent from "@/components/ui/StarryComponent";
import TopBar from "@/components/TopBar";
import ProductCardGrid from "@/components/ProductComponents/ContainerProducts";




export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = (params.Category_Name)?.toString();
  
  return (
    <div className="w-full min-h-screen">
          <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
              <StarryComponent />
              <TopBar />
              <ProductCardGrid Display={categoryName} />
       </div>
   
  );
} 




