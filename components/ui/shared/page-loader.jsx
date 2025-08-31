"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import beeAnimation from "@/public/bumblebee.json"; // adjust path

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[9999]">
      <Lottie 
        animationData={beeAnimation} 
        loop={true} 
        className="w-32 h-32" 
      />
    </div>
  );
}
