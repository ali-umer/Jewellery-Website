"use client";
import { useRouter, useParams } from "next/navigation";

import ProductCardGrid from "@/components/ProductComponents/ContainerProducts";




export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = (params.Category_Name)?.toString();
  
  return (<ProductCardGrid Display={categoryName}  />

   
  );
} 




