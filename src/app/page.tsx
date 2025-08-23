"use client"
import {useState,useRef} from "react";
import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import HeroSection from "@/components/HeaderComponents/HeroSection";
import TopSellers from "@/components/TopSellingProducts";
import Categories from "@/components/CategoryComponent/Categories";
import Footer from "@/components/Footer/Footer";
import {useIntersectionObserver} from "@/components/ui/InffiniteScroll";



export default function Home() {
  const [showCategory, setShowCategory] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

useIntersectionObserver(categoryRef as React.RefObject<Element>, () => setShowCategory(true), 0.5);
useIntersectionObserver(footerRef as React.RefObject<Element>, () => setShowFooter(true), 0.5);

return (
  <div className="flex flex-col min-h-screen w-full">
      <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
     
      <StarryComponent />
         
      <TopBar />
      <HeroSection />
 
      <TopSellers
        name="TOP SELLING PRODUCTS"
        ProductId={-1}
        CategoryId={-1}
      />

      <div ref={categoryRef}>
        {showCategory && <Categories />}
      </div>

    
      <div className="pt-10" ref={footerRef}>
        {showFooter && <Footer />}
      </div>

  
    </div>
  );
}
