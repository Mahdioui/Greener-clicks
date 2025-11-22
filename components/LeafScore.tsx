"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface LeafScoreProps {
  score: number; // 0–100, higher is better
}

/**
 * LeafScore
 * ---------
 * Visualises the green score (0–100) as a leaf with three states:
 * - Healthy green leaf (score >= 80)
 * - Leaf under stress / turning brown (score 50–79)
 * - Dark, wilting leaf (score < 50)
 *
 * This is intentionally simple and lightweight so it can later be
 * swapped for a Lottie animation if desired.
 */
export function LeafScore({ score }: LeafScoreProps) {
  const clamped = Math.max(0, Math.min(100, score));

  let label = "Wilting leaf";
  let leafColor = "text-amber-900";
  let bgColor = "bg-amber-50";

  if (clamped >= 80) {
    label = "Healthy leaf";
    leafColor = "text-emerald-700";
    bgColor = "bg-emerald-50";
  } else if (clamped >= 50) {
    label = "Leaf under stress";
    leafColor = "text-amber-700";
    bgColor = "bg-amber-50";
  }

  return (
    <motion.div
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${bgColor}`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
        animate={{ rotate: [-3, 3, -2, 2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inline leaf icon, color is driven by state */}
        <Leaf className={`h-4 w-4 ${leafColor}`} />
      </motion.div>
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-bold">
          {clamped}
        </span>
      </div>
    </motion.div>
  );
}


