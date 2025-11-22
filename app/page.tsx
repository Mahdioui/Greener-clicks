"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Leaf, Globe, Zap, Network, Activity, Server, Bolt, Users } from "lucide-react";
import Link from "next/link";
import { LearnCarbon } from "@/components/LearnCarbon";
import { LeafSavingsStrip } from "@/components/LeafSavingsStrip";
import { VisitJourneyTimeline } from "@/components/VisitJourneyTimeline";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState<"global" | "eu" | "us" | "asia" | "africa">("global");

  const handleAnalyze = () => {
    if (url.trim()) {
      setIsLoading(true);
      const params = new URLSearchParams({
        url,
        region,
      });
      window.location.href = `/results?${params.toString()}`;
    }
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#ECFDF5_0,_#F9FAFB_40%,_#FFFFFF_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb33_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb26_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.35]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-10">
        {/* Editorial hero with calm, product-grade layout */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)] md:items-start"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700 ring-1 ring-emerald-100">
              <span>Digital sustainability</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
                You fix bugs in your code every day.
                <br />
                Now debug your carbon footprint.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                Green Click turns any URL into a precise, region‑aware CO₂‑equivalent (CO₂e)
                breakdown with more detail than generic calculators—and a short list of
                changes that make a real difference.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-800">
                CO₂e per visit & per year
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-800">
                Comparisons to an average site
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-800">
                A short, opinionated action list
              </span>
            </div>
          </div>

          {/* Metrics vignette + overlaid input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-72 rounded-3xl border border-slate-200 bg-gradient-to-br from-[#ECFDF5] via-[#F9FAFB] to-[#FFFFFF] shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
              <div className="relative flex h-full flex-col gap-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-emerald-900/5">
                    <Image
                      src="/art/green-chip.svg"
                      alt="Green tech chip illustration"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-600">
                    A quick preview of how Green Click treats your page like a
                    tiny, measurable system.
                  </p>
                </div>

                {/* Big metric pill */}
                <div className="flex gap-4">
                  <div className="flex-1 rounded-2xl bg-white/90 p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Live snapshot
                    </p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-500">CO₂e per visit</p>
                        <p className="text-2xl font-semibold text-slate-900">
                          0.78g
                        </p>
                      </div>
                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">
                        Cleaner than 63% of tested sites
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#9BB89A] to-[#1D3A2F]" />
                    </div>
                  </div>
                  <div className="hidden w-32 flex-col justify-between rounded-2xl bg-white/90 p-3 text-[11px] text-slate-600 shadow-sm sm:flex">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        Region
                      </p>
                      <p>Global mix</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        Hosting
                      </p>
                      <p>Unknown</p>
                    </div>
                  </div>
                </div>

                {/* Mini chart row */}
                <div className="mt-auto grid grid-cols-[2fr,1.4fr] gap-3">
                  <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Yearly emissions (example)</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px]">
                        100k visits / month
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5 pt-1">
                      <div className="h-12 flex-1 rounded-full bg-emerald-300/80" />
                      <div className="h-16 flex-1 rounded-full bg-emerald-500/80" />
                      <div className="h-9 flex-1 rounded-full bg-[#C5D7C8]" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                    <p className="mb-2 text-[11px] font-semibold text-slate-700">
                      Rough breakdown
                    </p>
                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Images</span>
                        <span>54%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>JavaScript</span>
                        <span>27%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Other</span>
                        <span>19%</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>Browser</span>
                          <span className="h-px w-4 bg-slate-300" />
                          <span className="h-1 w-1 rounded-full bg-slate-400" />
                          <span>Hosting</span>
                          <span className="h-px w-4 bg-slate-300" />
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span>Device</span>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5">
                          {region === "global"
                            ? "Region: Global mix"
                            : region === "eu"
                            ? "Region: EU grid"
                            : region === "us"
                            ? "Region: US grid"
                            : region === "asia"
                            ? "Region: Asia"
                            : "Region: Africa"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping input card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="relative -mt-10 max-w-md rounded-3xl md:-mt-12 md:ml-auto"
            >
              <Card className="border-slate-200 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.16)]">
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium uppercase tracking-[0.22em]">
                      Start an analysis
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 ring-1 ring-emerald-100">
                      <Zap className="h-3 w-3" />
                      <span>Under 10 seconds</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      type="url"
                      placeholder="example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAnalyze();
                        }
                      }}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={handleAnalyze}
                      disabled={isLoading || !url.trim()}
                      className="h-10 rounded-full bg-emerald-700 px-4 text-xs font-medium tracking-wide text-emerald-50 hover:bg-emerald-800"
                    >
                      <Search className="mr-2 h-3.5 w-3.5" />
                      {isLoading ? "Analyzing…" : "Analyze URL"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600">
                    <span>Region</span>
                    <select
                      value={region}
                      onChange={(e) =>
                        setRegion(e.target.value as typeof region)
                      }
                      className="h-8 rounded-full border border-slate-200 bg-white px-3 text-[11px] text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="global">Global mix</option>
                      <option value="eu">Europe</option>
                      <option value="us">United States</option>
                      <option value="asia">Asia</option>
                      <option value="africa">Africa</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Grid as portfolio-style tiles */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
        >
          <Card className="border-slate-200 bg-card/90 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 h-32 rounded-2xl bg-[radial-gradient(circle_at_top,_#A7F3D0_0,_#ECFDF5_65%)] p-3">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="h-3 w-10 rounded-full bg-emerald-100" />
                  </div>
                  <div className="h-10 rounded-xl bg-white/80" />
                </div>
              </div>
              <h3 className="mb-1 text-base font-semibold text-slate-900">
                Real‑time carbon estimates
              </h3>
              <p className="text-[12px] leading-relaxed text-slate-600">
                See CO₂e per visit and per year in a single, calm snapshot.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-card/90 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 h-32 rounded-2xl bg-[#E5F3FF] p-3">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div className="h-3 w-16 rounded-full bg-[#DBEAFE]" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-10 flex-1 rounded-xl bg-white/80" />
                    <div className="h-10 w-8 rounded-xl bg-white/60" />
                  </div>
                </div>
              </div>
              <h3 className="mb-1 text-base font-semibold text-slate-900">
                Impact in human terms
              </h3>
              <p className="text-[12px] leading-relaxed text-slate-600">
                Translate grams of CO₂e into trees, cars, and flights for your team.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-card/90 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 h-32 rounded-2xl bg-[#E5E7EB] p-3">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div className="h-3 w-16 rounded-full bg-[#F8F5F0]" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-white/80" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/80" />
                    <div className="h-1.5 w-3/5 rounded-full bg-white/80" />
                  </div>
                </div>
              </div>
              <h3 className="mb-1 text-base font-semibold text-slate-900">
                Opinionated next steps
              </h3>
              <p className="text-[12px] leading-relaxed text-slate-600">
                Get a compact set of actions ordered by impact, not just a long checklist.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Horizontal summary band – what you get from a report */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-sky-50/40 to-white px-6 py-5 md:flex md:items-center md:justify-between md:gap-8">
            <div className="relative z-10 max-w-md space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                What you see in a report
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                A quick, visual snapshot of your page&apos;s footprint.
              </h2>
              <p className="text-sm text-slate-600">
                Every analysis comes with CO₂e per visit, yearly impact, a resource
                breakdown, and human‑friendly comparisons you can share with your team.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600">
                <span className="rounded-full bg-white/80 px-3 py-1 font-medium shadow-sm">
                  CO₂e per visit & per year
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 font-medium shadow-sm">
                  Trees, cars, and streaming equivalents
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 font-medium shadow-sm">
                  Region‑aware grid assumptions
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-5 grid w-full max-w-md gap-3 md:mt-0 md:grid-cols-3">
              <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Per visit
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">0.78 g</p>
                <p className="text-[11px] text-slate-500">Example CO₂e snapshot</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Per year
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">9.3 kg</p>
                <p className="text-[11px] text-slate-500">At 100k monthly visits</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Leaf score
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-700">82</p>
                <p className="text-[11px] text-slate-500">Healthy leaf range</p>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />
          </div>
        </motion.section>

        {/* Why your website footprint matters */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
          className="mt-16 grid gap-8 md:grid-cols-[minmax(0,2.4fr)_minmax(0,2.2fr)] md:items-start"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Why this matters
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.6rem]">
              Believe it or not, your website does leave a mark on the planet.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Every page view pulls electricity through data centres, networks,
              and devices. Heavy pages demand more energy; cleaner, leaner pages
              travel lighter and cost less—both in carbon and in user patience.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Green Click helps you see that impact in numbers you can
              share—then nudges you towards decisions that make your site faster,
              calmer, and easier on the grid.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm">
            <div className="mb-2 flex justify-center">
              <Image
                src="/art/green-globe.svg"
                alt="Illustration of a connected green globe"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Leaf className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Climate</p>
                <p className="text-[12px] text-slate-600">
                  Even small reductions per page view add up across thousands of
                  visits and many sites.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Stakeholders & compliance
                </p>
                <p className="text-[12px] text-slate-600">
                  Helpful for B Corp, Scope 3 and sustainability reporting—and
                  for users who care what their clicks support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Performance & experience
                </p>
                <p className="text-[12px] text-slate-600">
                  The same changes that lower CO₂e—fewer bytes, fewer requests—
                  usually make your site feel snappier and clearer to use.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="mb-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              How it works
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-[1.6rem]">
              A simple model for a complex system
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
              Inspired by tools like Website Carbon and Digital Carbon Online,
              Green Click estimates your footprint from a few key ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-slate-200 bg-white/80 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Network className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Internet data flow
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700">
                  Page weight and requests tell us how much data moves through
                  data centres, networks, and devices for each view.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Activity className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Page load data
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700">
                  We use size, optimisation level, and caching hints to estimate
                  energy used per first and repeat visit.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Server className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Data‑centre power
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700">
                  Hosting type and location affect how clean the electricity is
                  behind each page view.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Bolt className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Grid carbon intensity
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700">
                  Region selection swaps in different electricity mixes to show
                  how location shifts your CO₂e story.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white/80 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Users className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Engagement & traffic
                  </p>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700">
                  Monthly visits and simple engagement assumptions scale per‑visit
                  emissions up to annual impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Interactive savings + journey section */}
        <LeafSavingsStrip />
        <VisitJourneyTimeline />

        {/* Learn about website carbon */}
        <LearnCarbon />

      </div>
    </div>
  );
}

