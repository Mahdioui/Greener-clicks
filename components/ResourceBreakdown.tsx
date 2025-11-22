"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Image, Code, FileText, Type, File, Leaf } from "lucide-react";
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
      <Card className="border-slate-200 bg-white/90 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Resource breakdown
              </p>
              <CardTitle className="mt-1 text-sm font-semibold text-slate-900">
                Where your bytes — and CO₂e — are hiding
              </CardTitle>
            </div>
            <p className="text-[11px] text-slate-500">
              Per‑visit transfer, grouped by type.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] md:items-center">
            {/* Pie chart for CO₂e by resource */}
            <div className="h-64 md:h-72">
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
                        ? [`${value.toFixed(2)} g`, "CO₂e"]
                        : [`${value.toFixed(2)} KB`, "Size"]
                    }
                  />
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

            {/* Legend rows with both size and CO₂e share */}
            <div className="space-y-3">
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

                const numericSizePct = parseFloat(sizePct);
                let leafCount = 1;
                let leafTone = "text-amber-700";

                if (numericSizePct < 20) {
                  leafCount = 3;
                  leafTone = "text-emerald-700";
                } else if (numericSizePct < 40) {
                  leafCount = 2;
                  leafTone = "text-emerald-500";
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <div
                          className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
                          style={{ color: item.color }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {item.value.toFixed(2)} KB · {sizePct}% of bytes
                          </p>
                          {co2Value !== undefined && (
                            <p className="mt-0.5 text-[11px] text-emerald-700">
                              {co2Value.toFixed(2)} g CO₂e{" "}
                              {co2Pct && (
                                <span className="text-[10px] text-slate-500">
                                  ({co2Pct}% of CO₂e)
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/70">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.max(8, Math.min(100, numericSizePct))}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: leafCount }).map((_, i) => (
                            <Leaf
                              key={i}
                              className={`h-3 w-3 ${leafTone}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
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
              Data shown per visit. CO₂e shares are estimated using the
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

