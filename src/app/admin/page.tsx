import React from "react"
import StarryComponent from "@/components/ui/StarryComponent";
import CircleButtonGroup from "@/components/adminComponent/buttons";

export default function Admin(){
   return( 
     <div className="flex flex-col min-h-screen w-full">
    <canvas id="stars" className="fixed inset-0 z-[-1]"></canvas>
    <StarryComponent />
    <CircleButtonGroup />
    </div>
   )
    
    
}