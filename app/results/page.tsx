"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { EmissionsCard } from "@/components/EmissionsCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { RecommendationList } from "@/components/RecommendationList";
import { EmissionsChart } from "@/components/EmissionsChart";
import { ResourceBreakdown } from "@/components/ResourceBreakdown";
import { EnergyGauge } from "@/components/EnergyGauge";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, History } from "lucide-react";
import { MemoryGame } from "@/components/MemoryGame";
import { sustainabilityFacts } from "@/components/FunFacts";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnalysisResult {
  co2PerVisit: number;
  yearlyCO2: number;
  pageSizeMB: number;
  greenHosting: boolean;
  comparisons: {
    carKm: number;
    trees: number;
    charges: number;
    shortFlights?: number;
    kettleBoils?: number;
    streamingHours?: number;
    beefBurgers?: number;
  };
  url: string;
  monthlyVisits: number;
  resourceBreakdown?: {
    images: number;
    js: number;
    css: number;
    fonts: number;
    other: number;
  };
  breakdown?: {
    dataCenter: number;
    network: number;
    client: number;
    total: number;
  };
  totalRequests?: number;
  greenHostingInfo?: {
    green: boolean;
    hostedBy?: string;
  };
  co2ByResource?: {
    images: number;
    js: number;
    css: number;
    fonts: number;
    other: number;
  };
  greenScore?: number;
  averageWebsite?: {
    co2PerVisit: number;
    yearlyCO2: number;
    cleanerThanAverage: number;
  };
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url") || "";
  const initialRegion =
    (searchParams.get("region") as
      | "global"
      | "eu"
      | "us"
      | "asia"
      | "africa"
      | null) || "global";

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyVisits, setMonthlyVisits] = useState(10000);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [region, setRegion] = useState<
    "global" | "eu" | "us" | "asia" | "africa"
  >(initialRegion);

  const fetchAnalysis = useCallback(
    async (targetUrl: string, visits: number, selectedRegion: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: targetUrl,
            monthlyVisits: visits,
            region: selectedRegion,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to analyze website");
        }

        const data = await response.json();
        // Map API response to match our interface while remaining backwards compatible
        setAnalysis({
          co2PerVisit: data.co2PerVisit || data.co2_per_visit,
          yearlyCO2: data.yearlyCO2 || data.yearly_co2,
          pageSizeMB: data.pageSizeMB || data.page_size_mb,
          greenHosting: data.greenHosting ?? data.green_hosting,
          comparisons: {
            carKm: data.comparisons?.carKm || data.comparisons?.car_km,
            trees: data.comparisons?.trees,
            charges: data.comparisons?.charges,
            shortFlights: data.comparisons?.shortFlights,
            kettleBoils: data.comparisons?.kettleBoils,
            streamingHours: data.comparisons?.streamingHours,
            beefBurgers: data.comparisons?.beefBurgers,
          },
          url: data.url,
          monthlyVisits:
            data.monthlyVisits || data.monthly_visits || visits,
          resourceBreakdown: data.resourceBreakdown,
          breakdown: data.breakdown,
          totalRequests: data.totalRequests,
          greenHostingInfo: data.greenHostingInfo,
          co2ByResource: data.co2ByResource,
          greenScore: data.greenScore,
          averageWebsite: data.averageWebsite,
        });
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (url) {
      fetchAnalysis(url, monthlyVisits, region);
    } else {
      setError("No URL provided");
      setIsLoading(false);
    }
  }, [url, fetchAnalysis, region, monthlyVisits]);

  const handleRecalculate = async () => {
    if (!url) return;
    setIsRecalculating(true);
    await fetchAnalysis(url, monthlyVisits, region);
    setIsRecalculating(false);
  };

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="mx-auto max-w-7xl py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <h2 className="mb-2 text-xl font-semibold text-red-800">
                Error
              </h2>
              <p className="text-red-600">{error}</p>
              <Link href="/">
                <Button className="mt-4" variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const displayHost = (() => {
    try {
      const clean = analysis.url.replace(/^https?:\/\//, "");
      return clean.split("/")[0];
    } catch {
      return analysis.url;
    }
  })();

  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#ECFDF5_0,_#F9FAFB_40%,_#FFFFFF_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb33_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb26_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.35]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        {/* Header as project-style intro */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="h-8 rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back
                </Button>
              </Link>
              <Link href="/history">
                <Button
                  variant="ghost"
                  className="h-8 rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <History className="mr-1.5 h-3.5 w-3.5" />
                  History
                </Button>
              </Link>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 ring-1 ring-emerald-100">
              <span>Carbon analysis</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,3.1fr)_minmax(0,2.2fr)] md:items-start">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-50 shadow-sm">
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {displayHost.charAt(0).toUpperCase() || "S"}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Site snapshot
                  </p>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {displayHost}
                  </h1>
                </div>
              </div>
              <p className="break-all text-xs text-slate-600">{analysis.url}</p>
              {analysis.totalRequests && (
                <p className="text-xs text-slate-600">
                  {analysis.totalRequests} requests ·{" "}
                  {analysis.pageSizeMB.toFixed(2)} MB transferred per visit
                </p>
              )}
              <div className="mt-2 inline-flex flex-wrap gap-2 text-[10px] text-slate-600">
                <span className="rounded-full bg-slate-100 px-2.5 py-1">
                  Your site
                </span>
                {analysis.averageWebsite && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    Average site benchmark
                  </span>
                )}
                <span className="rounded-full bg-slate-100 px-2.5 py-1">
                  Low‑carbon target
                </span>
              </div>
            </div>

            {/* Monthly visits & region selector with thumbnail artwork */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="grid gap-3 md:grid-rows-[auto_minmax(0,1fr)]"
            >
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold uppercase tracking-[0.2em]">
                    Scenario
                  </span>
                  <span>Adjust visits and region to explore impact.</span>
                </div>
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] sm:items-end">
                    <div>
                      <label
                        htmlFor="visits"
                        className="mb-1 block text-xs font-medium text-slate-800"
                      >
                        Monthly visits
                      </label>
                      <Input
                        id="visits"
                        type="number"
                        value={monthlyVisits}
                        onChange={(e) =>
                          setMonthlyVisits(Number(e.target.value) || 0)
                        }
                        min="0"
                        className="h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-800">
                        Region (grid mix)
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {(
                          [
                            { id: "global", label: "Global", hint: "Avg. mix" },
                            { id: "eu", label: "Europe", hint: "Cleaner grid" },
                            { id: "us", label: "US", hint: "Mixed grid" },
                            { id: "asia", label: "Asia", hint: "Higher carbon" },
                            { id: "africa", label: "Africa", hint: "Highest avg." },
                          ] as const
                        ).map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              setRegion(
                                option.id as
                                  | "global"
                                  | "eu"
                                  | "us"
                                  | "asia"
                                  | "africa"
                              )
                            }
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 transition ${
                              region === option.id
                                ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span>{option.label}</span>
                            <span className="text-[10px] text-slate-400">
                              {option.hint}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Changing the region updates the grid carbon intensity used in your CO₂e
                      estimates.
                    </span>
                    <Button
                      onClick={handleRecalculate}
                      disabled={isRecalculating}
                      className="h-9 shrink-0 rounded-full bg-emerald-700 px-3 text-[11px] font-medium text-emerald-50 hover:bg-emerald-800"
                    >
                      <RefreshCw
                        className={`mr-1.5 h-3.5 w-3.5 ${
                          isRecalculating ? "animate-spin" : ""
                        }`}
                      />
                      Recalculate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Thumbnail artwork referencing the home hero */}
              <div className="relative h-20 overflow-hidden rounded-2xl border border-slate-200 bg-card/80 shadow-sm">
                <Image
                  src="/art/green-chip.svg"
                  alt="Green tech chip illustration"
                  fill
                  className="object-cover opacity-[0.25]"
                />
                <div className="relative flex h-full items-center justify-between px-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      Emissions study
                    </p>
                    <p className="text-[11px] text-slate-800">
                      {displayHost}
                    </p>
                  </div>
                  <div className="flex h-10 w-16 items-end gap-1.5">
                    <div className="h-3/5 flex-1 rounded-full bg-emerald-300/80" />
                    <div className="h-4/5 flex-1 rounded-full bg-emerald-500/80" />
                    <div className="h-2/5 flex-1 rounded-full bg-[#E5E7EB]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero metrics: numbers + visual gauge */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2.2fr)]">
          <EmissionsCard
            co2PerVisit={analysis.co2PerVisit}
            yearlyCO2={analysis.yearlyCO2}
            pageSizeMB={analysis.pageSizeMB}
            greenHosting={analysis.greenHosting}
            greenScore={analysis.greenScore}
          />
          <EnergyGauge
            yearlyCO2={analysis.yearlyCO2}
            greenScore={analysis.greenScore}
          />
        </section>

        {/* Visual breakdowns */}
        <section className="mt-8 grid gap-6 md:grid-cols-[minmax(0,2.4fr)_minmax(0,2.2fr)]">
          {analysis.resourceBreakdown && (
            <ResourceBreakdown
              breakdown={analysis.resourceBreakdown}
              co2ByResource={analysis.co2ByResource}
            />
          )}
          <ComparisonCard
            carKm={analysis.comparisons.carKm}
            trees={analysis.comparisons.trees}
            charges={analysis.comparisons.charges}
            shortFlights={analysis.comparisons.shortFlights}
            kettleBoils={analysis.comparisons.kettleBoils}
            streamingHours={analysis.comparisons.streamingHours}
            beefBurgers={analysis.comparisons.beefBurgers}
          />
        </section>

        {/* Emissions over time */}
        <section className="mt-8">
          <EmissionsChart
            monthlyVisits={analysis.monthlyVisits}
            co2PerVisit={analysis.co2PerVisit}
          />
        </section>

        {/* Recommendations */}
        <section className="mt-8">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Action plan for this page
              </CardTitle>
              <p className="mt-1 text-[12px] text-slate-600">
                Start with 1–2 high‑impact changes from this list, ship them, then rerun the
                report to see how your CO₂e score moves.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <RecommendationList
                resourceBreakdown={analysis.resourceBreakdown}
                greenHosting={analysis.greenHosting}
                co2PerVisit={analysis.co2PerVisit}
              />
            </CardContent>
          </Card>
        </section>

        {/* Fun facts + mini game */}
        <section className="mt-8">
          <Card className="border-emerald-100 bg-white/90 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Learn & play
                  </p>
                  <CardTitle className="mt-1 text-sm font-semibold text-slate-900">
                    Fun facts about digital emissions
                  </CardTitle>
                </div>
                <p className="text-[11px] text-slate-500 max-w-xs text-right">
                  Match the cards to reveal small tips and comparisons about how the web uses
                  energy.
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.6fr)] md:items-start">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3 shadow-inner">
                  <MemoryGame variant="wide" />
                </div>
                <div className="space-y-2 text-[12px] text-slate-700">
                  {sustainabilityFacts.slice(0, 4).map((fact) => (
                    <p
                      key={fact}
                      className="rounded-xl border border-emerald-50 bg-emerald-50/70 px-3 py-2"
                    >
                      {fact}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="mx-auto max-w-7xl py-8">
          <SkeletonLoader />
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}

