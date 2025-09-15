import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../shared/shadcn/card";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/shared/shadcn/progress";
import { Badge } from "../../shared/shadcn/badge";
const MarketInsights = ({insights}) => {
    const nextUpdateDistance = formatDistanceToNow(
          new Date(insights.nextUpdate),
          { addSuffix: true }
      );

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
    return (
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
    )
}

export default MarketInsights