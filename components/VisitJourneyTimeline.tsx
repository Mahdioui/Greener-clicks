"use client";

import React from "react";
import { motion } from "framer-motion";
import { MonitorSmartphone, Network, Server, Laptop2 } from "lucide-react";

type StepId = "browser" | "network" | "hosting" | "device";

interface JourneyStep {
  id: StepId;
  label: string;
  role: string;
  co2e: string;
  hint: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "browser",
    label: "Browser",
    role: "Request starts",
    co2e: "Device CPU & rendering",
    hint: "Heavier JS = more work for your user’s device.",
  },
  {
    id: "network",
    label: "Network",
    role: "Across the wire",
    co2e: "Data transfer energy",
    hint: "Fewer bytes and better caching mean fewer trips.",
  },
  {
    id: "hosting",
    label: "Hosting",
    role: "Data centre",
    co2e: "Server & storage emissions",
    hint: "Green hosting can cut this share by up to ~50%.",
  },
  {
    id: "device",
    label: "Device",
    role: "User’s screen",
    co2e: "Battery & screen energy",
    hint: "Fast, light pages are kinder to low‑power devices.",
  },
];

const stepIconMap: Record<StepId, React.ComponentType<{ className?: string }>> =
  {
    browser: MonitorSmartphone,
    network: Network,
    hosting: Server,
    device: Laptop2,
  };

export function VisitJourneyTimeline() {
  return (
    <section className="mt-16 w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              One visit, many hops
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Follow a single page view from browser to grid.
            </h2>
          </div>
          <p className="hidden max-w-xs text-[12px] text-slate-500 sm:block">
            Scroll horizontally on mobile to see each step. On desktop, the full
            journey is visible at a glance.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm"
        >
          {/* Mobile scroll hint */}
          <div className="mb-2 flex items-center justify-end gap-1 text-[10px] text-slate-400 md:hidden">
            <span>Scroll</span>
            <span className="inline-flex h-4 w-8 items-center justify-center rounded-full bg-slate-100">
              <span className="h-2 w-4 rounded-full bg-slate-300" />
            </span>
            <span className="text-xs">→</span>
          </div>

          <div className="flex items-stretch gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = stepIconMap[step.id];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative min-w-[220px] flex-1 cursor-default rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-slate-900">
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.role}</p>
                    </div>
                  </div>

                  <div className="mt-2 h-px w-full bg-gradient-to-r from-emerald-200 via-slate-200 to-sky-200" />

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <p className="text-[11px] font-medium text-slate-600">
                      CO₂e focus
                    </p>
                    <p className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-800 shadow-sm">
                      {step.co2e}
                    </p>
                  </div>

                  <p className="mt-2 line-clamp-3 text-[11px] text-slate-600 group-hover:line-clamp-none">
                    {step.hint}
                  </p>

                  <div className="pointer-events-none absolute inset-x-2 bottom-[110%] z-20 hidden rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 shadow-lg md:block md:opacity-0 md:transition-opacity group-hover:opacity-100">
                    <p className="font-semibold text-emerald-900">
                      {step.label} · CO₂e focus
                    </p>
                    <p className="mt-0.5">{step.hint}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="pointer-events-none mt-1 hidden items-center justify-between text-[11px] text-slate-400 md:flex">
            <span>Browser</span>
            <span>Network</span>
            <span>Hosting</span>
            <span>Device</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}