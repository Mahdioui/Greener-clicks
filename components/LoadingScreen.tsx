"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Globe2, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// A set of light, factual snippets about web CO₂ and sustainability.
// Sources include WebsiteCarbon and general sustainable web design literature.
const funFacts: string[] = [
  "The internet is estimated to be responsible for up to 3.8% of global CO₂ emissions.",
  "An average web page visit produces around 1.76 g of CO₂.",
  "100,000 monthly page views can emit as much CO₂ as driving ~1,600 miles in a typical car.",
  "Eco-conscious websites aim to emit less than 1 g of CO₂ per page view.",
  "Optimising images can reduce page weight by up to 70% and cut emissions dramatically.",
  "Streaming video is one of the largest contributors to internet-related CO₂ emissions.",
  "Data centres consume roughly 1% of global electricity demand.",
  "Switching to green hosting can halve the data centre emissions for your site.",
  "Caching and CDNs can significantly cut repeat data transfer and CO₂ per returning user.",
  "Reducing unused JavaScript and CSS improves performance and lowers emissions together.",
];

interface LoadingScreenProps {
  /** Optional message under the main heading */
  message?: string;
}

/**
 * LoadingScreen
 * -------------
 * Full-screen overlay shown while the analysis request is pending.
 * - Spinning globe to indicate activity
 * - Rotating sustainability fun facts
 * - A tiny "catch the leaf" mini‑game that reveals facts and tracks clicks
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Analyzing your website’s carbon footprint…",
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [leafClicks, setLeafClicks] = useState(0);
  const [highlightedFact, setHighlightedFact] = useState<string | null>(null);

  // Rotate facts every ~4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentFact = funFacts[currentFactIndex];

  // Predefine a few leaf positions so layout is deterministic & lightweight.
  const leaves = useMemo(
    () => [
      { id: 1, top: "10%", left: "15%", delay: 0 },
      { id: 2, top: "25%", left: "70%", delay: 0.5 },
      { id: 3, top: "65%", left: "20%", delay: 1 },
      { id: 4, top: "75%", left: "75%", delay: 1.5 },
    ],
    []
  );

  const handleLeafClick = (id: number) => {
    setLeafClicks((prev) => prev + 1);
    // Reveal a random fact on click for a moment
    const randomFact =
      funFacts[Math.floor(Math.random() * funFacts.length)];
    setHighlightedFact(randomFact);
    // Clear highlight after a short delay so it feels snappy
    setTimeout(() => setHighlightedFact(null), 2600);
  };

  const renderLeavesGame = () => (
    <>
      {/* Floating leaves mini-game layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {leaves.map((leaf) => (
          <button
            key={leaf.id}
            type="button"
            aria-label="Catch the leaf"
            onClick={() => handleLeafClick(leaf.id)}
            className="pointer-events-auto absolute text-emerald-400 hover:text-emerald-500"
            style={{ top: leaf.top, left: leaf.left }}
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 6, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: leaf.delay,
              }}
            >
              <Leaf className="h-7 w-7 drop-shadow-sm" />
            </motion.div>
          </button>
        ))}
      </div>

      {/* Mini‑game status / hint */}
      <div className="mt-3 w-full rounded-2xl bg-white/70 p-3 text-xs text-emerald-700 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">
            Catch the leaves to reveal more tips.
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
            Leaves caught: {leafClicks}
          </span>
        </div>
        <AnimatePresence>
          {highlightedFact && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-[11px] leading-snug text-emerald-800"
            >
              {highlightedFact}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50">
      {/* Central card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Spinning globe with subtle glow */}
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

          {/* Mini‑game area */}
          {renderLeavesGame()}

          <p className="pt-2 text-[11px] text-emerald-500">
            We&apos;ll show you how your site compares to the average website
            once the analysis is ready.
          </p>
        </div>
      </motion.div>
    </div>
  );
};


