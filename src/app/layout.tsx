import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import { CartProvider } from "@/hooks/Controllers/cartContext";
import Footer from "@/components/Footer/Footer";
import AnonUserProvider from "@/components/AnonUserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pasha Jewellery | Best Artificial Jewellery in Pakistan",
  description: "e-Commerce store for Artificial Jewellery",
   icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <div className="flex flex-col min-h-screen w-full">
            <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
           <AnonUserProvider>

            <StarryComponent /> 
          <CartProvider>
            <TopBar />
          {children}
        </CartProvider>
          </AnonUserProvider>
       <Footer />
         
        </div>
      </body>
    </html>
  );
}
