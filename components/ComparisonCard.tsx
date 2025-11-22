"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Car,
  TreePine,
  Battery,
  Plane,
  Coffee,
  MonitorPlay,
} from "lucide-react";

interface ComparisonCardProps {
  carKm: number;
  trees: number;
  charges: number;
  shortFlights?: number;
  kettleBoils?: number;
  streamingHours?: number;
  beefBurgers?: number;
}

/**
 * ComparisonCard
 * --------------
 * Shows fun, human-friendly comparisons for yearly CO₂ emissions:
 * - Car kilometers
 * - Trees needed
 * - Smartphone charges
 * - Optional extras: flights, kettle boils, streaming hours, burgers
 */
export function ComparisonCard({
  carKm,
  trees,
  charges,
  shortFlights,
  kettleBoils,
  streamingHours,
  beefBurgers,
}: ComparisonCardProps) {
  const comparisons = [
    {
      icon: Car,
      label: "Car kilometres",
      value: carKm.toFixed(1),
      unit: "km driven",
      color: "text-sky-700",
      tint: "bg-sky-50",
    },
    {
      icon: TreePine,
      label: "Trees needed / year",
      value: trees.toFixed(1),
      unit: "average trees",
      color: "text-emerald-700",
      tint: "bg-emerald-50",
    },
    {
      icon: Battery,
      label: "Smartphone charges",
      value: charges.toFixed(0),
      unit: "full charges",
      color: "text-fuchsia-700",
      tint: "bg-fuchsia-50",
    },
    shortFlights !== undefined && shortFlights > 0
      ? {
          icon: Plane,
          label: "Short flights",
          value: shortFlights.toFixed(2),
          unit: "one‑way trips",
          color: "text-sky-700",
          tint: "bg-sky-50",
        }
      : null,
    kettleBoils !== undefined && kettleBoils > 0
      ? {
          icon: Coffee,
          label: "Kettle boils",
          value: kettleBoils.toFixed(0),
          unit: "cups of tea",
          color: "text-amber-700",
          tint: "bg-amber-50",
        }
      : null,
    streamingHours !== undefined && streamingHours > 0
      ? {
          icon: MonitorPlay,
          label: "Streaming hours",
          value: streamingHours.toFixed(1),
          unit: "hrs of HD video",
          color: "text-rose-700",
          tint: "bg-rose-50",
        }
      : null,
  ].filter(Boolean) as {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    unit: string;
    color: string;
    tint: string;
  }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-slate-200 bg-white/90 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Environmental impact
              </p>
              <CardTitle className="mt-1 text-sm font-semibold text-slate-900">
                Yearly CO₂e in human terms
              </CardTitle>
            </div>
            <p className="text-[11px] text-slate-500">
              Based on your current visits and region.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison, index) => {
              const Icon = comparison.icon;
              // Small, subtle micro-animation presets per type
              const isCar = comparison.label.startsWith("Car");
              const isTree = comparison.label.startsWith("Trees");
              const isPhone = comparison.label.startsWith("Smartphone");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ${comparison.color}`}
                      animate={
                        isCar
                          ? { x: [0, 2, -2, 0] }
                          : isTree
                          ? { scale: [1, 1.05, 1] }
                          : isPhone
                          ? { y: [0, -2, 0] }
                          : undefined
                      }
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-xs text-slate-500">
                        {comparison.label}
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        <span className={comparison.color}>{comparison.value}</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {comparison.unit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

