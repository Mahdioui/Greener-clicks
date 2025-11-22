"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Leaf, Globe, Zap, History } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (url.trim()) {
      setIsLoading(true);
      window.location.href = `/results?url=${encodeURIComponent(url)}`;
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900 sm:text-6xl">
            EcoSite Analyzer
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Measure your website's carbon footprint and discover ways to reduce
            your environmental impact
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
            <CardContent className="p-6">
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
                Get actionable tips to reduce your website's carbon footprint
              </p>
            </CardContent>
          </Card>
        </motion.div>

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

