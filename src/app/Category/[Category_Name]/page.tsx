"use client";
import { useRouter, useParams, } from "next/navigation";
import {useState} from "react";


import ProductCardGrid from "@/components/ProductComponents/ContainerProducts";
import { useEffect } from "react";




export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = (params.Category_Name)?.toString();
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
  const updatePageSize = () => {
      if (window.innerWidth >= 768) {
        setPageSize(8);
      } else {
        setPageSize(4); 
      }
    };
  },[]);


  return (
       <ProductCardGrid Display={categoryName} pageSize={pageSize}  />
  );
       

   
  
} 




