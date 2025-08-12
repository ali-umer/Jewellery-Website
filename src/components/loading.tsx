import React from "react";
import { LoaderThree } from "@/components/ui/Loader";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="scale-[2]">
        <LoaderThree />
      </div>
    </div>
  );
}
