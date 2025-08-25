"use client";
import {useParams} from "next/navigation";
import StarryComponent from "@/components/ui/StarryComponent";
import TopBar from "@/components/TopBar";
import ProductPage from "@/components/ProductComponents/ProductPage";


export default function Page() {
  const params = useParams();
  const id = parseInt(params.id as string, 10); 




  return (
              <ProductPage Id={id} />

  );
}


