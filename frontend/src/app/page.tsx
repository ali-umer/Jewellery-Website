import TopBar from "@/components/TopBar";
import Card from "@/components/Card";
import "@/styles/geometric.css";
import StarryComponent from "@/components/StarryComponent";
import FadeInOnView from "@/components/FadeInOnView";


export default function Home() {

  return (
    <div className="w-full min-h-screen">
      <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>

        <TopBar />
        <StarryComponent />

      <div className="flex relative items-center justify-center h-screen">

        <div className="geometric geometric-1"></div>
        <div className="geometric geometric-2"></div>
        <div className="geometric geometric-3"></div>
        <FadeInOnView>
          <div className="max-w-[850px] text-center">
            <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-bold leading-[1.1] mb-6 text-[var(--gold)] tracking-[-0.03em]">
              Where Elegance Meets Exception
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-[600px] mx-auto font-normal">
              Minimal meets majestic. Discover jewellery designed to elevate every moment with subtle sophistication.
            </p>
            <a href="#products" className="inline-flex items-center gap-3 bg-[var(--secondary)] text-[var(--primary)] px-8 py-4 rounded-lg text-base font-medium no-underline transition-all duration-400 ease-out shadow-[0_4px_20px_var(--shadow)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] after:content-['→'] after:transition-transform after:duration-300 hover:after:translate-x-1">
              <b>Discover</b>
            </a>
          </div>
        </FadeInOnView>
      </div>


      <div id="products" className="flex flex-wrap items-center justify-center h-screen scroll gap-5 md:gap-10 md:ml-20 md:mr-20">
        <div className="w-full text-center px-4">
          <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-[var(--primary)] tracking-tight font-playfair-display">
            TOP SELLERS
          </h3>
        </div>
        <Card />
        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>


  );
}