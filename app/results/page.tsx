"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EmissionsCard } from "@/components/EmissionsCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { RecommendationList } from "@/components/RecommendationList";
import { EmissionsChart } from "@/components/EmissionsChart";
import { ResourceBreakdown } from "@/components/ResourceBreakdown";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, History } from "lucide-react";
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
            data.monthlyVisits || data.monthly_visits || monthlyVisits,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="mx-auto max-w-7xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex gap-2 mb-4">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analysis Results
          </h1>
          <p className="mt-2 text-gray-600">{analysis.url}</p>
          {analysis.totalRequests && (
            <p className="text-sm text-muted-foreground">
              {analysis.totalRequests} requests • {analysis.pageSizeMB.toFixed(2)} MB transferred
            </p>
          )}
        </motion.div>

        {/* Monthly Visits & Region Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-green-200 bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1 space-y-3 sm:flex sm:items-end sm:gap-6 sm:space-y-0">
                  <div className="flex-1">
                    <label
                      htmlFor="visits"
                      className="mb-1 block text-sm font-medium"
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
                      className="max-w-xs"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="region"
                      className="mb-1 block text-sm font-medium"
                    >
                      Region (grid mix)
                    </label>
                    <select
                      id="region"
                      value={region}
                      onChange={(e) =>
                        setRegion(
                          e.target.value as
                            | "global"
                            | "eu"
                            | "us"
                            | "asia"
                            | "africa"
                        )
                      }
                      className="h-10 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="global">Global mix</option>
                      <option value="eu">Europe</option>
                      <option value="us">United States</option>
                      <option value="asia">Asia</option>
                      <option value="africa">Africa</option>
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleRecalculate}
                  disabled={isRecalculating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${
                      isRecalculating ? "animate-spin" : ""
                    }`}
                  />
                  Recalculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 gap-6">
          <EmissionsCard
            co2PerVisit={analysis.co2PerVisit}
            yearlyCO2={analysis.yearlyCO2}
            pageSizeMB={analysis.pageSizeMB}
            greenHosting={analysis.greenHosting}
            greenScore={analysis.greenScore}
          />
        </div>

        <div className="mt-6">
          <ComparisonCard
            carKm={analysis.comparisons.carKm}
            trees={analysis.comparisons.trees}
            charges={analysis.comparisons.charges}
            shortFlights={analysis.comparisons.shortFlights}
            kettleBoils={analysis.comparisons.kettleBoils}
            streamingHours={analysis.comparisons.streamingHours}
            beefBurgers={analysis.comparisons.beefBurgers}
          />
        </div>

        {analysis.resourceBreakdown && (
          <div className="mt-6">
            <ResourceBreakdown
              breakdown={analysis.resourceBreakdown}
              co2ByResource={analysis.co2ByResource}
            />
          </div>
        )}

        <div className="mt-6">
          <EmissionsChart
            monthlyVisits={analysis.monthlyVisits}
            co2PerVisit={analysis.co2PerVisit}
          />
        </div>

        <div className="mt-6">
          <RecommendationList
            resourceBreakdown={analysis.resourceBreakdown}
            greenHosting={analysis.greenHosting}
            co2PerVisit={analysis.co2PerVisit}
          />
        </div>
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

