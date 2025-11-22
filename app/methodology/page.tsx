"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ECFDF5_0,_#F9FAFB_40%,_#FFFFFF_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb1f_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb1f_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                How it works
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.8rem]">
                A simple model for your website&apos;s CO₂e
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Green Click uses a lightweight version of the Sustainable Web Design model.
                We look at page weight, how electricity is produced in a region, and how
                often the page is viewed to estimate CO₂‑equivalent (CO₂e).
              </p>
            </div>
            <div className="hidden sm:block">
              <Image
                src="/art/green-globe.svg"
                alt="Illustration of a connected green globe"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>
          <Link
            href="/"
            className="hidden text-xs text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline sm:inline-block"
          >
            ← Back to analyzer
          </Link>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="space-y-6"
        >
          <Card className="border-slate-200 bg-white/80">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                1. From page weight to CO₂e
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] md:items-center text-sm text-slate-700">
              <p>
                Every request your page makes transfers data through data centres, networks,
                and devices. Heavier pages mean more data, more electricity, and more
                emissions per visit.
              </p>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800">
                  Three steps
                </p>
                <ul className="space-y-1.5 text-[12px] text-emerald-900">
                  <li>1. We add up all bytes loaded for a single page view.</li>
                  <li>2. We convert those bytes into estimated electricity use.</li>
                  <li>3. We multiply by the carbon intensity of the chosen region.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                2. What we factor in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                The estimate you see on the results page combines a few simple ingredients
                rather than a detailed infrastructure audit.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Page & traffic
                  </p>
                  <ul className="space-y-1.5 text-[12px]">
                    <li>Page weight and number of requests per visit.</li>
                    <li>How many times a month the page is viewed.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Electricity & region
                  </p>
                  <ul className="space-y-1.5 text-[12px]">
                    <li>Regional grid carbon intensity (e.g. EU vs US vs Asia).</li>
                    <li>A simple adjustment if your host is listed as green.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                3. How to read the numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                Green Click is designed to be directional. It&apos;s best for comparing your
                own pages over time, not for official reporting.
              </p>
              <ul className="space-y-1.5 text-[13px]">
                <li>
                  Focus on trends: make changes, rerun the report, and watch CO₂e per visit
                  move up or down.
                </li>
                <li>
                  Use the leaf score as a quick cue for stakeholders who don&apos;t follow
                  grams and kilobytes.
                </li>
                <li>
                  Combine these numbers with qualitative UX work: faster, lighter pages are
                  usually better for people and the planet.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                4. Sources & further reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <ul className="list-disc space-y-1 pl-5 text-[13px]">
                <li>
                  <a
                    href="https://www.websitecarbon.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline-offset-2 hover:underline"
                  >
                    Website Carbon
                  </a>{" "}
                  – methodology and averages for web page CO₂e.
                </li>
                <li>
                  <a
                    href="https://sustainablewebdesign.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline-offset-2 hover:underline"
                  >
                    Sustainable Web Design
                  </a>{" "}
                  – Tom Greenwood&apos;s framework for digital emissions.
                </li>
                <li>
                  <a
                    href="https://theshiftproject.org/en/article/lean-ict-our-new-report/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline-offset-2 hover:underline"
                  >
                    The Shift Project – Lean ICT
                  </a>
                </li>
              </ul>
              <p className="pt-2 text-xs text-slate-500">
                These references inform the model behind Green Click, but the numbers you
                see here are still estimates, not an official carbon inventory.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4 text-xs text-slate-600">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-2 text-emerald-700 hover:bg-emerald-50"
            >
              ← Back to analyzer
            </Link>
          </div>
        </motion.main>
      </div>
    </div>
  );
}


