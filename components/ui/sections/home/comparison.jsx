"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { generateJobSearchComparisonOverYears } from "@/actions/comparison";
import { Loader2 } from "lucide-react";

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-border rounded-lg shadow-md px-4 py-3">
        <p className="text-sm font-medium text-foreground">Year: {label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}:{" "}
            <span className="font-semibold text-foreground">
              {entry.value}%
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Comparison = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const data = await generateJobSearchComparisonOverYears();

        const formatted = data.yearlyComparison.map((item) => ({
          year: item.year,
          aiAssisted: item.successRates.aiAssisted,
          traditional: item.successRates.traditional,
        }));

        setChartData(formatted);
      } catch (error) {
        console.error("Error fetching job search comparison:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, []);

  return (
    <section className="w-full py-20 bg-background/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-46">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bond">
            AI vs Traditional Career Services
          </h2>
          <p className="text-muted-foreground text-lg mt-3 px-0">
            Success rate trends using AI-based vs Traditional way of job hunt
            (2015 – 2025)
          </p>
        </motion.div>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-card rounded-2xl shadow-xl p-6"
        >
          <div className="w-full h-[300px]">
            {loading ? (
              <>
                <div className="flex justify-center items-center h-full text-muted-foreground gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />{" "}
                  Loading chart...
                </div>
              </>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <defs>
                    {/* Gradient for AI-Assisted */}
                    <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    {/* Gradient for Traditional */}
                    <linearGradient
                      id="tradGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#ef4444"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="aiAssisted"
                    stroke="url(#aiGradient)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#2563eb" }}
                    activeDot={{ r: 6, fill: "#1d4ed8" }}
                    name="AI-Assisted"
                  />
                  <Line
                    type="monotone"
                    dataKey="traditional"
                    stroke="url(#tradGradient)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#ef4444" }}
                    activeDot={{ r: 6, fill: "#b91c1c" }}
                    name="Traditional"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
