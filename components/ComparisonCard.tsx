"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Car, TreePine, Battery } from "lucide-react";

interface ComparisonCardProps {
  carKm: number;
  trees: number;
  charges: number;
}

export function ComparisonCard({ carKm, trees, charges }: ComparisonCardProps) {
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
      label: "Trees Needed",
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
  ];

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
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className={`${comparison.bgColor} rounded-lg p-4`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full bg-white p-2 ${comparison.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
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

