"use client";

import React, { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryGame } from "@/components/MemoryGame";
import { sustainabilityFacts } from "@/components/FunFacts";

interface LoadingScreenProps {
  /** Optional message under the main heading */
  message?: string;
}

/**
 * LoadingScreen
 * -------------
 * Full-screen overlay shown while the analysis request is pending.
 * - Spinning globe loader
 * - Rotating sustainability fun facts
 * - A small memory card game to keep users engaged while waiting
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Analyzing your website’s carbon footprint…",
}) => {
  // Rotating facts (independent of the memory game)
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [matchFact, setMatchFact] = useState<string | null>(null);

  // Rotate facts every ~4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % sustainabilityFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentFact = sustainabilityFacts[currentFactIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-md rounded-3xl bg-white/85 p-8 shadow-xl backdrop-blur-sm"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Spinning globe loader */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 opacity-60 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 shadow-lg">
              <Globe2 className="h-10 w-10 text-white animate-spin-slow" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-emerald-800">
              Crunching the numbers…
            </h2>
            <p className="mt-1 text-sm text-emerald-700">{message}</p>
          </div>

          {/* Rotating fun fact */}
          <div className="mt-2 min-h-[64px] w-full rounded-2xl bg-emerald-50/80 p-4 text-center text-sm text-emerald-800 shadow-inner">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Did you know?
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFact}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="text-sm leading-relaxed"
              >
                {currentFact}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Memory card game */}
          <MemoryGame onMatchFact={setMatchFact} variant="compact" />

          <AnimatePresence>
            {matchFact && (
              <motion.p
                key={matchFact}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mt-1 max-w-md text-center text-[11px] text-emerald-900"
              >
                {matchFact}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="pt-2 text-[11px] text-emerald-500">
            We&apos;ll show you how your site compares to the average website
            as soon as the analysis is ready.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

