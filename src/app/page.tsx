import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import HeroSection from "@/components/HeroSection";
import TopSellers from "@/components/Top-Selling-Products";
import Categories from "@/components/Categories";


export default function Home() {

  return (
    <div className="w-full min-h-screen">
      <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
          <StarryComponent />
          <TopBar />
          <HeroSection />
          <TopSellers />
          <Categories />

   </div>


  );
}