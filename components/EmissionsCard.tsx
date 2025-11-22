"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Droplets, Globe2, HardDrive, Zap } from "lucide-react";
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
 * - CO₂e per visit
 * - Yearly CO₂e (based on current monthly visits)
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
      <Card className="border-slate-200 bg-white/90 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Footprint summary
            </p>
            <CardTitle className="mt-1 text-sm font-semibold text-slate-900">
              CO₂e per visit, per year, and page weight
            </CardTitle>
          </div>
          {typeof greenScore === "number" && <LeafScore score={greenScore} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                  <Droplets className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium text-slate-700">Per visit</p>
              </div>
              <p className="text-xs text-slate-500">CO₂e per page view</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                <NumberCounter value={co2PerVisit} decimals={2} suffix=" g" />
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                  <Globe2 className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium text-slate-700">Per year</p>
              </div>
              <p className="text-xs text-slate-500">Based on current visits</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                <NumberCounter
                  value={yearlyCO2 / 1000}
                  decimals={2}
                  suffix=" kg"
                />
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                  <HardDrive className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium text-slate-700">
                  Page weight
                </p>
              </div>
              <p className="text-xs text-slate-500">Total transfer per view</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                <NumberCounter
                  value={pageSizeMB}
                  decimals={2}
                  suffix=" MB"
                />
              </p>
            </div>
          </div>
          <div
            className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[12px] ${
              greenHosting
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="font-medium">
                {greenHosting
                  ? "Green hosting detected via The Green Web Foundation."
                  : "Hosting not listed as green — consider moving to a greener provider."}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
