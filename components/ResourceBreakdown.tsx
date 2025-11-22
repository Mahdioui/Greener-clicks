"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Image, Code, FileText, Type, File } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface ResourceBreakdownProps {
  breakdown: {
    images: number; // KB
    js: number;
    css: number;
    fonts: number;
    other: number;
  };
  co2ByResource?: {
    images: number;
    js: number;
    css: number;
    fonts: number;
    other: number;
  };
}

const COLORS = {
  images: "#10b981", // green
  js: "#3b82f6", // blue
  css: "#8b5cf6", // purple
  fonts: "#f59e0b", // amber
  other: "#6b7280", // gray
};

export function ResourceBreakdown({
  breakdown,
  co2ByResource,
}: ResourceBreakdownProps) {
  const sizeData = [
    {
      name: "Images",
      value: breakdown.images,
      icon: Image,
      color: COLORS.images,
    },
    {
      name: "JavaScript",
      value: breakdown.js,
      icon: Code,
      color: COLORS.js,
    },
    {
      name: "CSS",
      value: breakdown.css,
      icon: FileText,
      color: COLORS.css,
    },
    {
      name: "Fonts",
      value: breakdown.fonts,
      icon: Type,
      color: COLORS.fonts,
    },
    {
      name: "Other",
      value: breakdown.other,
      icon: File,
      color: COLORS.other,
    },
  ].filter((item) => item.value > 0);

  const totalSize = sizeData.reduce((sum, item) => sum + item.value, 0);

  const co2Data =
    co2ByResource &&
    [
      {
        name: "Images",
        value: co2ByResource.images,
        color: COLORS.images,
      },
      {
        name: "JavaScript",
        value: co2ByResource.js,
        color: COLORS.js,
      },
      {
        name: "CSS",
        value: co2ByResource.css,
        color: COLORS.css,
      },
      {
        name: "Fonts",
        value: co2ByResource.fonts,
        color: COLORS.fonts,
      },
      {
        name: "Other",
        value: co2ByResource.other,
        color: COLORS.other,
      },
    ].filter((item) => item.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Resource Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pie chart for CO₂ by resource */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value: number) =>
                      co2ByResource
                        ? [`${value.toFixed(2)} g`, "CO₂"]
                        : [`${value.toFixed(2)} KB`, "Size"]
                    }
                  />
                  <Legend />
                  <Pie
                    data={co2Data || sizeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {(co2Data || sizeData).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend cards with both size and CO₂ share */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {sizeData.map((item, index) => {
                const Icon = item.icon;
                const sizePct = ((item.value / totalSize) * 100).toFixed(1);
                const co2Value = co2ByResource
                  ? co2ByResource[item.name.toLowerCase() as keyof typeof co2ByResource]
                  : undefined;
                const totalCo2 =
                  co2ByResource &&
                  Object.values(co2ByResource).reduce((a, b) => a + b, 0);
                const co2Pct =
                  co2Value && totalCo2
                    ? ((co2Value / totalCo2) * 100).toFixed(1)
                    : undefined;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="rounded-lg border bg-white p-3"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="rounded-full p-1.5"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: item.color }}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.value.toFixed(2)} KB{" "}
                      <span className="text-xs text-muted-foreground">
                        ({sizePct}% of bytes)
                      </span>
                    </p>
                    {co2Value !== undefined && (
                      <p className="mt-1 text-xs text-emerald-700">
                        {co2Value.toFixed(2)} g CO₂{" "}
                        {co2Pct && (
                          <span className="text-[11px] text-muted-foreground">
                            ({co2Pct}% of CO₂)
                          </span>
                        )}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Old layout summary kept conceptually: this section is now folded into the cards above */}
          {/* Previously: individual cards per resource with size and percentage */}
          {/* We now present the same information alongside CO₂ share where available. */}
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              Data shown per visit. CO₂ shares are estimated using the
              Sustainable Web Design Model, proportionally to bytes per
              resource type.
            </p>
          </div>

          {/* Legacy layout (bar cards) has been replaced by the more visual pie/legend combination above. */}
          {/* This keeps the UI lightweight while adding a more playful, dashboard-style visualization. */}
          {/*
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {sizeData.map((item, index) => {
              const Icon = item.icon;
              const percentage = ((item.value / totalSize) * 100).toFixed(1);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="rounded-lg border bg-white p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="rounded-full p-1.5"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <p className="text-lg font-bold" style={{ color: item.color }}>
                    {item.value.toFixed(2)} KB
                  </p>
                  <p className="text-xs text-muted-foreground">{percentage}% of total</p>
                </motion.div>
              );
            })}
          </div> */}
        </CardContent>
      </Card>
    </motion.div>
  );
}

