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
      label: "Car Kilometers",
      value: carKm.toFixed(1),
      unit: "km",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TreePine,
      label: "Trees Needed / year",
      value: trees.toFixed(1),
      unit: "trees",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Battery,
      label: "Smartphone Charges",
      value: charges.toFixed(0),
      unit: "charges",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    shortFlights !== undefined && shortFlights > 0
      ? {
          icon: Plane,
          label: "Short Flights",
          value: shortFlights.toFixed(2),
          unit: "one‑way flights",
          color: "text-sky-600",
          bgColor: "bg-sky-50",
        }
      : null,
    kettleBoils !== undefined && kettleBoils > 0
      ? {
          icon: Coffee,
          label: "Kettle Boils",
          value: kettleBoils.toFixed(0),
          unit: "cups of tea",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        }
      : null,
    streamingHours !== undefined && streamingHours > 0
      ? {
          icon: MonitorPlay,
          label: "Streaming Hours",
          value: streamingHours.toFixed(1),
          unit: "hrs of HD video",
          color: "text-rose-600",
          bgColor: "bg-rose-50",
        }
      : null,
  ].filter(Boolean) as {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    unit: string;
    color: string;
    bgColor: string;
  }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {comparisons.map((comparison, index) => {
              const Icon = comparison.icon;
              // Small micro-animation presets per type
              const isCar = comparison.label.startsWith("Car");
              const isTree = comparison.label.startsWith("Trees");
              const isPhone = comparison.label.startsWith("Smartphone");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`${comparison.bgColor} rounded-lg p-4`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`rounded-full bg-white p-2 ${comparison.color}`}
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
                      <p className="text-sm text-muted-foreground">
                        {comparison.label}
                      </p>
                      <p className={`text-2xl font-bold ${comparison.color}`}>
                        {comparison.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
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

