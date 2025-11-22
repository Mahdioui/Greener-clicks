"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, ArrowRight, Leaf } from "lucide-react";

interface RegionImpact {
  region: "EU" | "US" | "Africa";
  label: string;
}

interface BookPage {
  id: string;
  title: string;
  impactLabel: string;
  impactScore: number; // 1–5
  why: string;
  action: string;
  note?: string;
  illustrationLabel: string;
  regions?: RegionImpact[];
}

const PAGES: BookPage[] = [
  {
    id: "lazy-images",
    title: "Lazy‑load heavy imagery",
    impactLabel: "High impact — can cut CO₂e per visit by 20–35% on image‑heavy pages.",
    impactScore: 5,
    why: "Images often account for 50–70% of page weight. Loading only what is visible avoids sending megabytes that the user never sees.",
    action: "Load images only when they enter the viewport, with low‑quality placeholders or solid‑color blocks before that.",
    note: "Start with long, scrollable pages: blog indexes, galleries, product lists.",
    illustrationLabel: "A column of photographs that only fully appear as you scroll down the page.",
    regions: [
      { region: "EU", label: "EU · lower grid intensity, but savings still add up." },
      { region: "US", label: "US · medium grid mix, strong absolute CO₂e savings." },
      { region: "Africa", label: "Africa · higher average intensity, lazy‑loading really matters." },
    ],
  },
  {
    id: "compress-assets",
    title: "Compress everything on the wire",
    impactLabel: "High impact — Gzip/Brotli can shrink text assets by 70–85%.",
    impactScore: 5,
    why: "HTML, CSS, JS, and JSON are all highly compressible. Smaller files mean less data over the network and faster first paint.",
    action: "Enable Brotli or Gzip for text responses and verify compression ratios in your browser’s network panel.",
    note: "Pay special attention to API payloads that contain repeated keys or verbose JSON.",
    illustrationLabel: "A large bundle being gently squeezed down into a smaller, tighter package.",
  },
  {
    id: "cdn",
    title: "Serve static assets from a CDN",
    impactLabel: "High impact for global audiences — fewer hops, less energy per request.",
    impactScore: 4,
    why: "Content delivered from edge locations travels fewer network segments. This reduces latency, infrastructure load, and energy use per byte.",
    action: "Move images, fonts, and static bundles to a CDN close to your users and cache them aggressively.",
    note: "Check cache‑hit ratios in logs or your provider dashboard to avoid CO₂e‑heavy misses.",
    illustrationLabel: "A world map with small, efficient servers close to clusters of users.",
  },
  {
    id: "svg",
    title: "Prefer SVG over heavy raster icons",
    impactLabel: "Medium–high impact on icon‑heavy UIs.",
    impactScore: 4,
    why: "SVGs are vectors: they scale cleanly and are usually just a few hundred bytes instead of multiple kilobytes per PNG.",
    action: "Swap decorative PNG icons for SVG alternatives and inline critical icons for fewer requests.",
    note: "Keep shapes simple and flat; avoid complex filters that increase rendering cost.",
    illustrationLabel: "Simple line icons drawn as clean paths instead of filled bitmap tiles.",
  },
  {
    id: "unused-code",
    title: "Clean up unused JS & CSS",
    impactLabel: "Moderate impact — less CPU work, better battery life.",
    impactScore: 3,
    why: "Every extra kilobyte of script must be parsed, compiled, and sometimes executed on user devices.",
    action: "Use your bundler’s analysis tools to remove dead code, unused components, and legacy styles.",
    note: "Lean bundles help low‑power laptops and phones stay responsive and cool.",
    illustrationLabel: "A tangle of code being gently pruned back into a neat, compact core.",
  },
  {
    id: "green-hosting",
    title: "Run on renewable‑powered infrastructure",
    impactLabel: "Very high — switching hosting can cut operational emissions by up to 90%.",
    impactScore: 5,
    why: "Even efficient code draws from the grid. Providers that match usage with renewables dramatically shrink the operational footprint.",
    action: "Choose providers with credible green‑energy commitments and publish a short note on your sustainability choices.",
    note: "Combine green hosting with lighter pages for end‑to‑end benefits.",
    illustrationLabel: "A server rack with cables turning into stems and leaves as they reach the grid.",
  },
  {
    id: "fonts",
    title: "Optimise your fonts like assets",
    impactLabel: "Lower–medium impact, but often an easy win during redesigns.",
    impactScore: 2,
    why: "Fonts commonly weigh 100–400 KB per weight and style. Multiple families add up quickly.",
    action: "Limit families and weights, subset to the characters you need, and preload only the most important files.",
    note: "System fonts remain a perfectly valid, low‑carbon choice in many interfaces.",
    illustrationLabel: "A tidy stack of type specimens, with a few unnecessary weights set aside.",
  },
];

export const GreenCodingBook: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const currentPage = PAGES[pageIndex];

  const goPrev = () => {
    setPageIndex((prev) => (prev === 0 ? PAGES.length - 1 : prev - 1));
  };

  const goNext = () => {
    setPageIndex((prev) => (prev === PAGES.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const treeScale = 0.9 + currentPage.impactScore * 0.05;

  return (
    <section
      className="w-full max-w-3xl rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top,_#f4ede2_0,_#f8f5f0_45%,_#f8f5f0_100%)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Green coding handbook, flip through recommendations"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Green coding handbook
            </p>
            <p className="text-xs text-slate-600">
              Flip through quiet, field‑guide style recommendations for lower‑carbon code.
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-[11px] text-slate-500 sm:flex">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
            {String(pageIndex + 1).padStart(2, "0")} / {PAGES.length}
          </span>
        </div>
      </div>

      {/* Book spread */}
      <div className="relative flex flex-col gap-5 md:flex-row md:gap-6">
        {/* Left page — illustration placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative flex-1 rounded-[22px] border border-slate-200 bg-[#f8f4ec] px-4 py-4 shadow-sm"
        >
          <div className="pointer-events-none absolute inset-x-4 top-3 h-3 border-b border-dashed border-slate-200" />
          <div className="flex h-full flex-col justify-between pt-2">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Field sketch
              </p>

              {/* Minimal inline “drawing” that you can later swap with a real SVG */}
              <motion.div
                key={currentPage.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative mt-1 flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-[#f4eee3]"
              >
                {/* Simple, flat composition hinting at the recommendation type */}
                {currentPage.id === "lazy-images" && (
                  <div className="flex w-[80%] items-end justify-between gap-2">
                    <div className="h-20 flex-1 rounded-xl bg-gradient-to-b from-emerald-200 to-emerald-100 shadow-sm" />
                    <div className="h-14 flex-1 rounded-xl bg-slate-100 shadow-sm" />
                    <div className="h-9 w-10 rounded-xl border border-slate-300 bg-white shadow-sm">
                      <div className="h-3 w-full rounded-t-xl bg-emerald-50" />
                    </div>
                  </div>
                )}
                {currentPage.id === "compress-assets" && (
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-24 rounded-xl bg-slate-100 shadow-sm" />
                    <div className="h-9 w-9 rounded-full border border-slate-300 bg-emerald-100 shadow-sm" />
                    <div className="h-6 w-16 rounded-full bg-emerald-600/90" />
                  </div>
                )}
                {currentPage.id === "cdn" && (
                  <div className="relative flex h-28 w-[80%] items-center justify-between">
                    <div className="h-16 w-16 rounded-full border border-slate-300 bg-slate-50 shadow-sm" />
                    <div className="h-20 w-24 rounded-2xl bg-emerald-100 shadow-sm" />
                    <div className="h-14 w-14 rounded-full border border-slate-300 bg-slate-50 shadow-sm" />
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      animate={{ opacity: [0.3, 0.9, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg
                        viewBox="0 0 120 60"
                        className="h-full w-full"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M10 50 C 40 10, 80 10, 110 50"
                          fill="none"
                          stroke="#3A613D"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
                {currentPage.id === "svg" && (
                  <div className="flex gap-4">
                    <svg width="72" height="48" viewBox="0 0 72 48" className="text-[#3A613D]">
                      <rect
                        x="4"
                        y="6"
                        width="64"
                        height="36"
                        rx="5"
                        className="fill-[#e7efe4] stroke-[#3A613D]"
                      />
                      <path
                        d="M10 34 L22 18 L32 30 L42 22 L54 34 Z"
                        className="fill-none stroke-[#3A613D]"
                        strokeWidth="1.4"
                      />
                    </svg>
                    <div className="flex flex-col justify-between text-[10px] text-slate-600">
                      <span>Use flat, vector shapes.</span>
                      <span>Keep lines clean, no gradients.</span>
                    </div>
                  </div>
                )}
                {currentPage.id === "unused-code" && (
                  <div className="flex w-[80%] flex-col gap-2">
                    <div className="h-2 rounded-full bg-slate-300/80" />
                    <div className="h-2 w-5/6 rounded-full bg-slate-300/60" />
                    <div className="h-2 w-4/6 rounded-full bg-slate-300/40" />
                    <div className="mt-2 h-1.5 w-1/3 rounded-full bg-emerald-500/80" />
                  </div>
                )}
                {currentPage.id === "green-hosting" && (
                  <div className="flex items-end gap-4">
                    <div className="h-16 w-20 rounded-lg bg-slate-100 shadow-sm" />
                    <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-emerald-100 shadow-sm">
                      <Leaf className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                )}
                {currentPage.id === "fonts" && (
                  <div className="flex w-[80%] flex-col gap-2">
                    <div className="flex gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 shadow-sm">
                        <span className="text-sm font-semibold text-slate-800">
                          Aa
                        </span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 shadow-sm">
                        <span className="text-sm font-semibold text-slate-800">
                          Ag
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-1/2 rounded-full bg-emerald-500/80" />
                  </div>
                )}
              </motion.div>

              <p className="font-serif text-[12px] text-slate-800">
                {currentPage.illustrationLabel}
              </p>
            </div>

            {/* Tree micro‑simulation */}
            <motion.div
              key={currentPage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-4 flex items-center justify-between text-[11px] text-slate-600"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: treeScale }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shadow-sm"
                >
                  <Leaf className="h-4 w-4" />
                </motion.div>
                <div className="space-y-0.5">
                  <p className="font-medium text-slate-800">Impact on the canopy</p>
                  <p>
                    Higher‑impact pages gently “grow” this tree as you flip through the book.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner hit‑area for navigation */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous page"
            className="group absolute left-0 top-0 h-9 w-9 rounded-br-[22px] bg-gradient-to-br from-transparent via-transparent to-[#e4d6c5] text-transparent transition hover:from-[#ede1d2] hover:via-transparent hover:to-[#d9c7b2] focus-visible:outline-none"
          >
            <span className="sr-only">Previous page</span>
          </button>
        </motion.div>

        {/* Right page — recommendation */}
        <div className="relative flex-1 rounded-[22px] border border-slate-200 bg-[#fbf7f1] px-4 py-4 shadow-sm">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={currentPage.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              <header className="mb-3 border-b border-slate-200 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Recommendation
                  </p>
                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 ring-1 ring-emerald-100">
                    <span className="leading-none">Impact</span>
                    <span aria-hidden="true">
                      {"★".repeat(currentPage.impactScore)}
                      {"☆".repeat(5 - currentPage.impactScore)}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  {currentPage.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-600">
                  {currentPage.impactLabel}
                </p>
              </header>

              <div className="space-y-3 text-[13px] leading-relaxed text-slate-700">
                <section>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Why this matters
                  </p>
                  <p>{currentPage.why}</p>
                </section>

                <section>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    One‑line checklist
                  </p>
                  <p>{currentPage.action}</p>
                </section>

                {currentPage.note && (
                  <section className="rounded-[18px] border border-dashed border-slate-300 bg-[#f7f1e7] px-3 py-2 text-[11px] text-slate-700">
                    <p className="font-semibold text-slate-800">Field note</p>
                    <p className="mt-0.5">{currentPage.note}</p>
                  </section>
                )}

                {currentPage.regions && (
                  <section className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Region‑based impact
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentPage.regions.map((region) => (
                        <span
                          key={region.region}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {region.label}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Page turn control in the lower‑right corner */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next page"
            className="group absolute bottom-0 right-0 h-10 w-10 rounded-tl-[22px] bg-gradient-to-tr from-transparent via-transparent to-[#e4d6c5] text-transparent transition hover:from-[#ede1d2] hover:via-transparent hover:to-[#d9c7b2] focus-visible:outline-none"
          >
            <span className="sr-only">Next page</span>
          </button>
        </div>
      </div>

      {/* Subtle notch‑style arrows for accessibility without dominating the layout */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/60 px-2 py-1 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Previous page</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/60 px-2 py-1 shadow-sm transition hover:bg-slate-50"
        >
          <span>Next page</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
};

