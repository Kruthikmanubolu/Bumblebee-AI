"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shared/shadcn/card";
import { Badge } from "@/components/ui/shared/shadcn/badge";
import { Progress } from "@/components/ui/shared/shadcn/progress";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/shared/shadcn/input";
import { Button } from "@/components/ui/shared/shadcn/button";
import { useRouter } from "next/navigation";
import CareerPathVisualizer from "@/components/ui/sections/careerpath/career-path-visualizer";
import { SendReportAction } from "@/actions/send-report";
const DashboardView = ({ insights }) => {
  const router = useRouter()
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range, key) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendReport = async () => {
    if (!email) return toast.error("Please enter an email");
    setSending(true);
    try {
      const result = await SendReportAction(email, insights)
      if (result?.status === "sent") {
        toast.success("Report sent successfully!");
      } else {
        toast.error(result?.error || "Failed to send report");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSending(false);
    }
  };

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      <div className="flex gap-2 items-end">
        <Input
          placeholder="Enter email to send report"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-sm border border-black"
        />
        <Button className='cursor-pointer' onClick={handleSendReport} disabled={sending}>
          {sending ? "Sending..." : "Send Report"}
        </Button>
        <div className="ml-auto">
          <Button className='cursor-pointer' onClick={() => router.push('/onboarding')}>
            Edit Profile
          </Button>
        </div>
      </div>



      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="col-span-6 md:col-span-12 sm:col-span-12">
        <CardHeader>
          <CardTitle className="text-lg sm:text-base">
            Salary Ranges by Role
          </CardTitle>
          <CardDescription className="text-sm sm:text-xs">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <div className="min-w-[600px] h-[350px] md:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={60} className="text-[11px]" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md p-2 shadow-md text-2xs">
                            <p className="font-medium">{label}</p>
                            {payload.map((item, index) => (
                              <p key={`${item.name}-${index}`}>
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                  <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                  <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="py-10 mx-auto">
        <div className="container">
          <CareerPathVisualizer />
        </div>
      </section>

      {/* Top Companies Paying the Highest Salaries */}
      <Card className="col-span-6 md:col-span-12 sm:col-span-12">
        <CardHeader>
          <CardTitle className="text-lg sm:text-base">
            Top Paying Companies by Experience Level
          </CardTitle>
          <CardDescription className="text-sm sm:text-xs">
            Based on AI-analyzed salary insights for your selected industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insights.topCompanies?.map((company, idx) => (
              <div
                key={idx}
                className="p-4 border border-border rounded-xl shadow-sm bg-muted"
              >
                <h4 className="text-base font-semibold text-primary">
                  {company.company}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {company.role} ({company.experienceLevel})
                </p>
                <p className="mt-1 text-sm">
                  💰 ${company.salary.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill, index) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;