"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { NumberCounter } from "@/components/NumberCounter";
import { LeafScore } from "@/components/LeafScore";

interface EmissionsCardProps {
  co2PerVisit: number;
  yearlyCO2: number;
  pageSizeMB: number;
  greenHosting: boolean;
  greenScore?: number;
}

/**
 * EmissionsCard
 * -------------
 * Primary summary card for:
 * - CO₂ per visit
 * - Yearly CO₂ (based on current monthly visits)
 * - Total page transfer size
 * - Optional green hosting badge + green score chip
 */
export function EmissionsCard({
  co2PerVisit,
  yearlyCO2,
  pageSizeMB,
  greenHosting,
  greenScore,
}: EmissionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-green-800">Carbon Emissions</CardTitle>
          {typeof greenScore === "number" && <LeafScore score={greenScore} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/90 p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Per visit</p>
              <p className="text-3xl font-bold text-green-700">
                <NumberCounter value={co2PerVisit} decimals={2} suffix="g" />
              </p>
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <div className="rounded-xl bg-white/90 p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Per year</p>
              <p className="text-3xl font-bold text-green-700">
                <NumberCounter
                  value={yearlyCO2 / 1000}
                  decimals={2}
                  suffix="kg"
                />
              </p>
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <div className="rounded-xl bg-white/90 p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Page size</p>
              <p className="text-3xl font-bold text-green-700">
                <NumberCounter
                  value={pageSizeMB}
                  decimals={2}
                  suffix="MB"
                />
              </p>
              <p className="text-xs text-muted-foreground">Transferred</p>
            </div>
          </div>
          <div
            className={`flex items-center justify-between gap-2 rounded-lg p-3 ${
              greenHosting
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                {greenHosting
                  ? "Green hosting detected via The Green Web Foundation"
                  : "Not listed as green hosting — consider switching to a greener host"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

