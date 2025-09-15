import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../shared/shadcn/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const SalaryGraph = ({insights}) => {
      const salaryData = insights.salaryRanges.map((range, key) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }));
    return (
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
    )
}

export default SalaryGraph