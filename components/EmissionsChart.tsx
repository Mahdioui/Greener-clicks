"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface EmissionsChartProps {
  monthlyVisits: number;
  co2PerVisit: number;
}

export function EmissionsChart({
  monthlyVisits,
  co2PerVisit,
}: EmissionsChartProps) {
  // Generate data for the last 12 months
  const data = Array.from({ length: 12 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (11 - i));
    return {
      month: month.toLocaleDateString("en-US", { month: "short" }),
      co2: (monthlyVisits * co2PerVisit) / 1000, // Convert to kg
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly CO₂ Emissions Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis
                dataKey="month"
                className="text-xs"
                stroke="currentColor"
              />
              <YAxis
                className="text-xs"
                stroke="currentColor"
                label={{
                  value: "CO₂ (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                }}
                formatter={(value: number) => [`${value.toFixed(2)} kg`, "CO₂"]}
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={2}
                dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

