"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Leaf, Globe, Zap, History } from "lucide-react";
import Link from "next/link";
import { LearnCarbon } from "@/components/LearnCarbon";

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Animated floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-green-200"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-emerald-200"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Globe className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-teal-200"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Zap className="h-8 w-8" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8 flex justify-end">
          <Link href="/history">
            <Button variant="ghost" className="text-green-700 hover:text-green-800">
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
          </Link>
        </div>

        {/* Header / Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-green-700">
              EcoSite Analyzer
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            How green is your website?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            Measure the CO₂ impact of your website in seconds and discover{" "}
            playful, science‑backed ways to make it cleaner and faster.
          </p>
        </motion.div>

        {/* URL Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <Card className="border-green-200 shadow-xl">
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAnalyze();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !url.trim()}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {isLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Tip: Choose a region to see how different electricity grids
                  change your CO₂ results.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Region</span>
                  <select
                    value={region}
                    onChange={(e) =>
                      setRegion(e.target.value as typeof region)
                    }
                    className="h-9 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="global">Global mix</option>
                    <option value="eu">Europe</option>
                    <option value="us">United States</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Real-time Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get instant carbon footprint calculations for any website
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Environmental Impact
              </h3>
              <p className="text-sm text-muted-foreground">
                See comparisons with car emissions, trees, and more
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Eco Recommendations
              </h3>
              <p className="text-sm text-muted-foreground">
                Get actionable tips to reduce your website&apos;s carbon footprint
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learn about website carbon */}
        <LearnCarbon />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          <p>Built with Next.js 14 • Powered by renewable energy calculations</p>
        </motion.div>
      </div>
    </div>
  );
}

