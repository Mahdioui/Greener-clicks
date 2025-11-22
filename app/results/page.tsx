"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EmissionsCard } from "@/components/EmissionsCard";
import { ComparisonCard } from "@/components/ComparisonCard";
import { EnergyGauge } from "@/components/EnergyGauge";
import { RecommendationList } from "@/components/RecommendationList";
import { EmissionsChart } from "@/components/EmissionsChart";
import { ResourceBreakdown } from "@/components/ResourceBreakdown";
import { SkeletonLoader } from "@/components/SkeletonLoader";
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
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url") || "";

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyVisits, setMonthlyVisits] = useState(10000);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const fetchAnalysis = useCallback(
    async (targetUrl: string, visits: number) => {
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
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to analyze website");
        }

        const data = await response.json();
        // Map API response to match our interface
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
          },
          url: data.url,
          monthlyVisits: data.monthlyVisits || data.monthly_visits || monthlyVisits,
          resourceBreakdown: data.resourceBreakdown,
          breakdown: data.breakdown,
          totalRequests: data.totalRequests,
          greenHostingInfo: data.greenHostingInfo,
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
      fetchAnalysis(url, monthlyVisits);
    } else {
      setError("No URL provided");
      setIsLoading(false);
    }
  }, [url, fetchAnalysis]);

  const handleRecalculate = async () => {
    if (!url) return;
    setIsRecalculating(true);
    await fetchAnalysis(url, monthlyVisits);
    setIsRecalculating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="mx-auto max-w-7xl py-8">
          <SkeletonLoader />
        </div>
      </div>
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

        {/* Monthly Visits Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-green-200 bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <label
                    htmlFor="visits"
                    className="mb-2 block text-sm font-medium"
                  >
                    Monthly Visits
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
                <Button
                  onClick={handleRecalculate}
                  disabled={isRecalculating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${isRecalculating ? "animate-spin" : ""}`}
                  />
                  Recalculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EmissionsCard
            co2PerVisit={analysis.co2PerVisit}
            yearlyCO2={analysis.yearlyCO2}
            pageSizeMB={analysis.pageSizeMB}
            greenHosting={analysis.greenHosting}
          />

          <EnergyGauge yearlyCO2={analysis.yearlyCO2} />
        </div>

        <div className="mt-6">
          <ComparisonCard
            carKm={analysis.comparisons.carKm}
            trees={analysis.comparisons.trees}
            charges={analysis.comparisons.charges}
          />
        </div>

        {analysis.resourceBreakdown && (
          <div className="mt-6">
            <ResourceBreakdown breakdown={analysis.resourceBreakdown} />
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

