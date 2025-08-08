import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import HeroSection from "@/components/HeaderComponents/HeroSection";
import TopSellers from "@/components/TopSellingProducts";
import Categories from "@/components/CategoryComponent/Categories";
import Cards from "@/components/TopProducts";
import Footer from "@/components/Footer/Footer";


export default function Home() {

  return (
  <div className="flex flex-col min-h-screen w-full">
    <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
          <StarryComponent />
          <TopBar />
          <HeroSection />
          <TopSellers name="TOP SELLING PRODCUTS" ProductId={-1} CategoryId={-1}  />{ /* these 2 props pass just to make sure no error,nothing means with logic, help with resuabiity of component */ }

            <Categories />

            <Footer />
          
         
  </div>
);
}