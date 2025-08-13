"use client";
import {useParams} from "next/navigation";
import StarryComponent from "@/components/ui/StarryComponent";
import TopBar from "@/components/TopBar";
import ProductPage from "@/components/ProductComponents/ProductPage";
import {useProduct} from "@/hooks/Backend/use-product";
import {Loader} from "@/components/loading";

export default function Page() {
  const params = useParams();
  const id = parseInt(params.id as string, 10); 




  return (
    <div className="w-full min-h-screen">
          <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
              <StarryComponent />
              <TopBar />
              <ProductPage Id={id} />
  </div>
   
  );
}


