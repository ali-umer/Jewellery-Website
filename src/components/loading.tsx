import React from "react";
import { LoaderThree } from "@/components/ui/Loader";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="origin-center scale-[2] sm:scale-[3]">
        <LoaderThree />
      </div>
       </div>
  );
}
