"use client";
import TopBar from "@/components/TopBar";
import StarryComponent from "@/components/ui/StarryComponent";
import CartPage from "@/components/CartComponents/CartPage";

// Sample Data

// Cart Container Component

 export default function Cart(){
   return ( <div className="w-full min-h-screen">
              <canvas id="stars" className="fixed inset-0 "></canvas>
                 <StarryComponent />
                  <TopBar />
                  <CartPage  />      
                  
        
           </div>

   );    
}
