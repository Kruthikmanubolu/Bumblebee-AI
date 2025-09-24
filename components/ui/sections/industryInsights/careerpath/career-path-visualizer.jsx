"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/shared/shadcn/card";
import { MobileFriendlyTooltip } from "@/components/ui/shared/mobile-friendly-tooltip";
import { TooltipProvider } from "@/components/ui/shared/shadcn/tooltip";
import { Loader2 } from "lucide-react";

export default function CareerPathVisualizer() {
  const [insight, setInsight] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    async function fetchInsight() {
      const res = await fetch("/api/insights");
      const data = await res.json();
      setInsight(data);
    }
    fetchInsight();
  }, []);

  if (!insight)
    return (
      <div className="flex text-center justify-center gap-2 py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        Loading career data...
      </div>
    );

  const rolesList = insight.salaryRanges || [];
  const careerPath =
    insight.careerProgression?.find((p) => p.role === selectedRole)?.path || [];

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-10">
        {/* Role Selection */}
        <Card className="border border-border shadow-lg rounded-3xl">
          <CardContent className="p-8">
            <h2 className="text-xl md:text-3xl font-extrabold">
              Roles in {insight?.industry || "Your Industry"}
            </h2>
            <p className="text-muted-foreground  mb-6 text-sm">
              Click to see the career path for the respective role
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rolesList.map((role, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRole(role.role)}
                  className={`p-4 border rounded-xl cursor-pointer hover:shadow-lg transition-all ${
                    selectedRole === role.role
                      ? "bg-primary/10 border-primary"
                      : "bg-card"
                  }`}
                >
                  <div className="font-semibold">{role.role}</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Salary: ${role.median.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Path for Selected Role */}
        {selectedRole && (
          <Card className="from-muted/40 to-background/70 backdrop-blur-sm border border-border shadow-lg rounded-3xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg md:text-2xl font-bold">
                  Career Path for {selectedRole}
                </h3>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-black underline hover:cursor-pointer"
                >
                  Hide
                </button>
              </div>

              <div className="flex items-center overflow-x-auto gap-12 relative pb-4 pr-24 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {careerPath.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center min-w-max">
                      <MobileFriendlyTooltip content={step.description}>
                        <div className="flex flex-col items-center justify-center text-center px-6 py-5 bg-card/80 border border-border shadow-md rounded-2xl hover:scale-[1.05] hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer backdrop-blur-sm">
                          <div className="text-4xl text-primary mb-2">
                            {step.icon}
                          </div>
                          <div className="text-base font-semibold">
                            {step.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {step.years} Years
                          </div>
                        </div>
                      </MobileFriendlyTooltip>
                    </div>

                    {idx !== careerPath.length - 1 && (
                      <div className="flex-shrink-0">
                        <svg
                          width="40"
                          height="24"
                          viewBox="0 0 40 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground"
                        >
                          <path
                            d="M0 12h36M30 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
