"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, Zap } from "lucide-react";

interface EmissionsCardProps {
  co2PerVisit: number;
  yearlyCO2: number;
  pageSizeMB: number;
  greenHosting: boolean;
}

export function EmissionsCard({
  co2PerVisit,
  yearlyCO2,
  pageSizeMB,
  greenHosting,
}: EmissionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Leaf className="h-6 w-6" />
            Carbon Emissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Per Visit</p>
              <p className="text-2xl font-bold text-green-700">
                {co2PerVisit.toFixed(2)}g
              </p>
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Yearly</p>
              <p className="text-2xl font-bold text-green-700">
                {(yearlyCO2 / 1000).toFixed(2)}kg
              </p>
              <p className="text-xs text-muted-foreground">CO₂</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Page Size</p>
              <p className="text-2xl font-bold text-green-700">
                {pageSizeMB.toFixed(2)}MB
              </p>
              <p className="text-xs text-muted-foreground">Transferred</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-lg p-3 ${
              greenHosting
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">
              {greenHosting
                ? "Green Hosting Detected"
                : "Consider switching to green hosting"}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

