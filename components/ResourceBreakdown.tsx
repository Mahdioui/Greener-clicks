"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Image, Code, FileText, Type, File } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ResourceBreakdownProps {
  breakdown: {
    images: number; // KB
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

export function ResourceBreakdown({ breakdown }: ResourceBreakdownProps) {
  const data = [
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

  const total = data.reduce((sum, item) => sum + item.value, 0);

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
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
                <YAxis
                  className="text-xs"
                  stroke="currentColor"
                  label={{ value: "Size (KB)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)} KB`, "Size"]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {data.map((item, index) => {
              const Icon = item.icon;
              const percentage = ((item.value / total) * 100).toFixed(1);
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

