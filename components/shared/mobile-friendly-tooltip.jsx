import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MobileFriendlyTooltip({ children, content }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) setOpen(!open);
  };

  return (
    <Tooltip open={isMobile ? open : undefined} onOpenChange={setOpen}>
      <TooltipTrigger asChild onClick={handleClick}>
        {children}
      </TooltipTrigger>
      <TooltipContent className="text-sm">{content}</TooltipContent>
    </Tooltip>
  );
}
