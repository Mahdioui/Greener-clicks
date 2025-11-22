"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const LEAF_SAVINGS = [
  {
    label: "Compress hero images",
    saving: "0.3 g CO₂e / visit",
    description: "Switching to AVIF/WebP and <200kb hero images.",
  },
  {
    label: "Trim unused JavaScript",
    saving: "0.2 g CO₂e / visit",
    description: "Removing dead code and third‑party scripts.",
  },
  {
    label: "Aggressive caching",
    saving: "0.15 g CO₂e / repeat visit",
    description: "Fewer full page loads for returning users.",
  },
  {
    label: "Green hosting",
    saving: "Up to 50% less DC CO₂e",
    description: "Running on infrastructure matched with renewables.",
  },
];

export function LeafSavingsStrip() {
  return (
    <section className="mt-16 w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Small choices, real savings
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              See how tiny fixes grow into a greener footprint.
            </h2>
          </div>
          <p className="hidden max-w-xs text-[12px] text-slate-500 sm:block">
            Each leaf below stands for one optimisation. As you scroll, they grow
            to show how quickly CO₂e savings stack up.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12px] text-slate-600">
              Hover a leaf to see a quick estimate. These are directional, not exact
              measurements.
            </p>
          </div>

          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LEAF_SAVINGS.map((item, index) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.85, y: 12 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: index * 0.05 },
                  },
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: [-1.5, 1.5, -1, 0],
                  transition: { duration: 0.35 },
                }}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/70 px-3 py-2.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                    <Leaf className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold text-emerald-900">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-emerald-700">{item.saving}</p>
                  </div>
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100/70">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, delay: 0.1 + index * 0.07 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700"
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-3 bottom-[110%] z-20 hidden rounded-2xl border border-emerald-100 bg-white px-3 py-2 text-[11px] text-slate-700 shadow-lg group-hover:block">
                  <p className="font-semibold text-emerald-900">{item.saving}</p>
                  <p className="mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}