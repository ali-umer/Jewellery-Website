import FadeInOnView from "../ui/FadeInOnView";
import "@/styles/geometric.css"

export default function HeroSection() {
    return (
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
    );
}