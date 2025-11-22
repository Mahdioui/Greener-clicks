"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

interface EnergyGaugeProps {
  yearlyCO2: number;
  maxCO2?: number;
}

export function EnergyGauge({
  yearlyCO2,
  maxCO2 = 1000,
}: EnergyGaugeProps) {
  const percentage = Math.min((yearlyCO2 / maxCO2) * 100, 100);
  const circumference = 2 * Math.PI * 70; // radius = 70
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage < 33) return "text-green-600";
    if (percentage < 66) return "text-yellow-600";
    return "text-red-600";
  };

  const getBgColor = () => {
    if (percentage < 33) return "bg-green-100";
    if (percentage < 66) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Energy Efficiency Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg
                className="h-48 w-48 -rotate-90 transform"
                viewBox="0 0 160 160"
              >
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-gray-200"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className={getColor()}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, delay: 0.3 }}
                  strokeDasharray={circumference}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className={`text-3xl font-bold ${getColor()}`}
                >
                  {Math.round(100 - percentage)}%
                </motion.p>
                <p className="text-sm text-muted-foreground">Efficient</p>
              </div>
            </div>
          </div>
          <div className={`mt-4 rounded-lg p-3 ${getBgColor()}`}>
            <p className="text-center text-sm">
              Your site produces{" "}
              <span className="font-semibold">
                {(yearlyCO2 / 1000).toFixed(2)}kg CO₂
              </span>{" "}
              per year
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

