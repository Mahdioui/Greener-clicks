"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { History, ExternalLink, Trash2, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Analysis {
  id: string;
  url: string;
  domain: string;
  createdAt: string;
  pageSizeMB: number;
  co2PerVisit: number;
  yearlyCO2: number;
  greenHosting: boolean;
  monthlyVisits: number;
}

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/history?limit=50");
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setAnalyses(data.analyses || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare chart data
  const chartData = analyses
    .slice()
    .reverse()
    .map((analysis) => ({
      date: new Date(analysis.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      co2: analysis.co2PerVisit,
      yearly: analysis.yearlyCO2 / 1000, // Convert to kg
    }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="mx-auto max-w-7xl py-8">
          <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="mx-auto max-w-7xl py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Analysis History
              </h1>
            </div>
            <Link href="/">
              <Button variant="outline">New Analysis</Button>
            </Link>
          </div>
        </motion.div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {analyses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <History className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold">No analyses yet</h3>
              <p className="mb-4 text-muted-foreground">
                Start analyzing websites to see your history here.
              </p>
              <Link href="/">
                <Button>Analyze a Website</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Chart */}
            {chartData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      CO₂ Trends Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-gray-200"
                        />
                        <XAxis
                          dataKey="date"
                          className="text-xs"
                          stroke="currentColor"
                        />
                        <YAxis
                          className="text-xs"
                          stroke="currentColor"
                          label={{
                            value: "CO₂ (g)",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="co2"
                          stroke="hsl(142, 76%, 36%)"
                          strokeWidth={2}
                          dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
                          name="CO₂ per visit (g)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Analysis List */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {analyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">
                            {analysis.domain}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground truncate">
                            {analysis.url}
                          </p>
                        </div>
                        {analysis.greenHosting && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Green
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            CO₂ per visit:
                          </span>
                          <span className="font-semibold">
                            {analysis.co2PerVisit.toFixed(2)}g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Yearly CO₂:
                          </span>
                          <span className="font-semibold">
                            {(analysis.yearlyCO2 / 1000).toFixed(2)}kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Page size:
                          </span>
                          <span className="font-semibold">
                            {analysis.pageSizeMB.toFixed(2)}MB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Monthly visits:
                          </span>
                          <span className="font-semibold">
                            {analysis.monthlyVisits.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2 border-t">
                          {new Date(analysis.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/results?url=${encodeURIComponent(analysis.url)}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <ExternalLink className="mr-2 h-3 w-3" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

