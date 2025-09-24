"use client";

import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/shared/shadcn/card";
import { Badge } from "@/components/ui/shared/shadcn/badge";
import { useRouter } from "next/navigation";
import CareerPathVisualizer from "@/components/ui/sections/industryInsights/careerpath/career-path-visualizer";
import JobOpeningsHeatmap from "@/components/ui/sections/industryInsights/job-openings";
import JobFeed from "@/components/ui/sections/industryInsights/job-feed";
import SendReport from "@/components/ui/sections/industryInsights/send-report";
import MarketInsights from "@/components/ui/sections/industryInsights/market-insights";
import SalaryGraph from "@/components/ui/sections/industryInsights/salary-graph";
import TopCompanies from "@/components/ui/sections/industryInsights/top-companies";
import KeyTrendsRecommendations from "@/components/ui/sections/industryInsights/key-trends-recommendations";
const DashboardView = ({ insights }) => {
  const router = useRouter();
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>
      <SendReport insights={insights} />
      {/* Market Overview Cards */}
      <MarketInsights insights={insights} />

      {/* Salary Ranges Chart */}
      <SalaryGraph insights={insights} />

      {/* Career Path */}
      <section className="py-10 mx-auto">
        <div className="container">
          <CareerPathVisualizer />
        </div>
      </section>

      {/* Top Companies Paying the Highest Salaries */}
      <TopCompanies insights={insights} />

      {/* Industry Trends */}
      <KeyTrendsRecommendations insights={insights} />
      {/* HeatMap */}
      {insights.jobOpenings && insights.jobOpenings.length > 0 && (
        <JobOpeningsHeatmap jobOpenings={insights.jobOpenings} />
      )}
      {/* Live Job Feed */}
      <Card className="py-10">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Live Job Feed</h2>
          <JobFeed />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
