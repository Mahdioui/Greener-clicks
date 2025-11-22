"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe2, Leaf, Zap, SlidersHorizontal } from "lucide-react";

/**
 * LearnCarbon
 * -----------
 * A small, interactive section explaining:
 * - What website CO₂ is
 * - Why it matters
 * - How simple optimisations reduce emissions
 *
 * Content is inspired by Sustainable Web Design / WebsiteCarbon methodology.
 */
export function LearnCarbon() {
  const items = [
    {
      icon: Globe2,
      title: "What is website CO₂?",
      body: "Every time a page loads, data travels through networks, data centres, and devices—each step using electricity. When that electricity comes from fossil fuels, it emits CO₂.",
      chips: ["Data transfer", "Electricity mix", "Devices"],
    },
    {
      icon: Zap,
      title: "Why it matters",
      body: "The internet is responsible for a few percent of global emissions—similar to aviation. Highly visited sites can emit tonnes of CO₂ per year if they are not optimised.",
      chips: ["High traffic impact", "Hidden footprint"],
    },
    {
      icon: SlidersHorizontal,
      title: "How to reduce it",
      body: "Compress images, reduce JavaScript and CSS, cache aggressively, and use green hosting. These steps shrink page weight and shift electricity to cleaner grids.",
      chips: ["Compress images", "Less JS/CSS", "Caching", "Green hosting"],
    },
  ];

  return (
    <section className="mt-20">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Learn
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Learn about website carbon
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
          Green Click uses the Sustainable Web Design model and public grid data
          to estimate how much CO₂‑equivalent (CO₂e) your pages emit—and how much
          you can save with a few smart changes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border-emerald-50 bg-white/80 shadow-sm backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{item.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border-emerald-50 bg-emerald-50/60">
          <CardContent className="p-4 text-sm text-emerald-900">
            <p className="mb-1 font-semibold">Why small changes matter</p>
            <p>
              Reducing a page from 3&nbsp;MB to 1&nbsp;MB can cut per‑visit
              emissions by more than half. At 100k monthly visits, that&apos;s
              the difference between emitting CO₂e equivalent to dozens of trees
              or just a handful.
            </p>
          </CardContent>
        </Card>
        <Card className="border-emerald-50">
          <CardContent className="flex items-center gap-3 p-4 text-sm text-slate-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Leaf className="h-5 w-5" />
            </div>
            <p>
              Green Click approximates regional grid intensity (e.g. Europe vs
              US vs Asia) so you can see how CO₂e per visit changes if most of
              your visitors are in a cleaner or more fossil‑heavy grid.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


