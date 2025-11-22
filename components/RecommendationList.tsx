"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface Recommendation {
  title: string;
  impact: "High" | "Medium" | "Low";
  desc: string;
  co2Saving?: string; // Estimated CO₂ saving per visit
  applicable: boolean; // Whether this recommendation applies to the current site
}

interface ResourceBreakdownData {
  images: number;
  js: number;
  css: number;
  fonts: number;
  other: number;
}

interface RecommendationListProps {
  resourceBreakdown?: ResourceBreakdownData;
  greenHosting?: boolean;
  co2PerVisit?: number;
}

export function RecommendationList({
  resourceBreakdown,
  greenHosting = false,
  co2PerVisit = 0,
}: RecommendationListProps) {
  // Calculate potential savings based on resource breakdown
  const calculateSavings = (
    category: keyof ResourceBreakdownData,
    reductionPercent: number
  ): string => {
    if (!resourceBreakdown) return "~0.01g";
    const sizeKB = resourceBreakdown[category];
    if (sizeKB === 0) return "N/A";
    
    // Convert KB to GB, then calculate CO₂
    const sizeGB = sizeKB / (1024 * 1024);
    const currentCO2 = sizeGB * 0.06 * 442; // SWDM calculation
    const savedCO2 = currentCO2 * (reductionPercent / 100);
    return savedCO2 > 0.01 ? `~${savedCO2.toFixed(2)}g` : "<0.01g";
  };

  const recommendations: Recommendation[] = [
    {
      title: "Compress Images",
      impact: "High" as const,
      desc: "Use WebP or AVIF format and compress images. Can reduce image size by 60-80%.",
      co2Saving: calculateSavings("images", 70),
      applicable: (resourceBreakdown?.images || 0) > 100, // >100KB
    },
    {
      title: "Minify JS & CSS",
      impact: "High" as const,
      desc: "Remove whitespace, comments, and unused code. Can reduce file sizes by 30-50%.",
      co2Saving: calculateSavings("js", 40) + " (JS), " + calculateSavings("css", 40) + " (CSS)",
      applicable: (resourceBreakdown?.js || 0) > 50 || (resourceBreakdown?.css || 0) > 20,
    },
    {
      title: "Enable Caching",
      impact: "High" as const,
      desc: "Implement browser and CDN caching to reduce repeat downloads. Can save 40-60% on return visits.",
      co2Saving: `~${(co2PerVisit * 0.5).toFixed(2)}g per return visit`,
      applicable: true,
    },
    {
      title: "Use Green Hosting",
      impact: "High" as const,
      desc: "Switch to hosting providers powered by renewable energy. Reduces data center emissions by ~50%.",
      co2Saving: greenHosting ? "Already using" : `~${(co2PerVisit * 0.15).toFixed(2)}g per visit`,
      applicable: !greenHosting,
    },
    {
      title: "Optimize Fonts",
      impact: "Medium" as const,
      desc: "Use system fonts or subset custom fonts to load only needed characters. Can reduce font size by 50-70%.",
      co2Saving: calculateSavings("fonts", 60),
      applicable: (resourceBreakdown?.fonts || 0) > 50,
    },
    {
      title: "Lazy Load Images",
      impact: "Medium" as const,
      desc: "Load images only when they're about to enter the viewport. Reduces initial page load by 30-50%.",
      co2Saving: calculateSavings("images", 40),
      applicable: (resourceBreakdown?.images || 0) > 200,
    },
    {
      title: "Reduce Third-Party Scripts",
      impact: "High" as const,
      desc: "Limit analytics, tracking, and advertising scripts. Each script adds network overhead and processing.",
      co2Saving: calculateSavings("js", 20) + " (estimated)",
      applicable: (resourceBreakdown?.js || 0) > 100,
    },
    {
      title: "Use Efficient CSS",
      impact: "Medium" as const,
      desc: "Remove unused CSS and use modern CSS features. Tools like PurgeCSS can reduce CSS by 40-60%.",
      co2Saving: calculateSavings("css", 50),
      applicable: (resourceBreakdown?.css || 0) > 50,
    },
    {
      title: "Avoid Auto-playing Videos",
      impact: "High" as const,
      desc: "Videos are large files. Only load videos when users explicitly request them.",
      co2Saving: "~0.5-2g per video",
      applicable: (resourceBreakdown?.other || 0) > 500,
    },
  ].filter((rec) => rec.applicable || rec.applicable === undefined);

  const impactColors = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Eco Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground flex-1">
                    {rec.title}
                  </h3>
                  <span
                    className={`ml-3 rounded-full border px-2 py-1 text-xs font-medium whitespace-nowrap ${impactColors[rec.impact]}`}
                  >
                    {rec.impact}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {rec.desc}
                </p>
                {rec.co2Saving && (
                  <p className="text-xs font-medium text-green-700 bg-green-50 rounded px-2 py-1 inline-block">
                    Potential saving: {rec.co2Saving} CO₂ per visit
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
