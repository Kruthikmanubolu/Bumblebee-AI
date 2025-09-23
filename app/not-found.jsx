"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import notfoundAnimation from "@/public/notfound.json"; // adjust path
export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[-9999]">
      <div className="w-[1000px] h-[1000px]">
        {" "}
        {/* Container controls size */}
        <Lottie
          animationData={notfoundAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
