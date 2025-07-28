import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import HeroSection from "@/components/HeaderComponents/HeroSection";
import TopSellers from "@/components/TopSellingProducts";
import Categories from "@/components/CategoryComponent/Categories";
import Cards from "@/components/TopProducts";


export default function Home() {

  return (
    <div className="w-full min-h-screen ">
      <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
          <StarryComponent />
          <TopBar />
          <HeroSection />
          <TopSellers name="TOP SELLING PRODUCTS" />
          

         <div className="mt-4">
             <Categories />
         </div>

   </div>


  );
}