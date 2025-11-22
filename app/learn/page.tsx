"use client";

import Image from "next/image";
import { LearnCarbon } from "@/components/LearnCarbon";
import { ImpactExplanation } from "@/components/ImpactExplanation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Link2, ListChecks } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ECFDF5_0,_#F9FAFB_40%,_#FFFFFF_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb1f_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb1f_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 flex justify-center">
            <Image
              src="/art/green-globe.svg"
              alt="Illustration of a connected green globe"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            <span>Resources</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Sustainable web &amp; Green IT resources
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Deep‑dive into the science behind digital emissions, and get
            checklists for building lighter, faster, and more sustainable
            products.
          </p>
        </motion.div>

        {/* Impact explanation & infographic */}
        <ImpactExplanation />

        {/* Books, blogs, research, checklists */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="h-full border-emerald-50">
              <CardHeader className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">
                  Recommended books on Green IT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <ul className="list-disc space-y-1 pl-4">
                  <li>
                    <span className="font-semibold">
                      Sustainable Web Design
                    </span>{" "}
                    — Tom Greenwood
                  </li>
                  <li>
                    <span className="font-semibold">
                      Designing for Sustainability
                    </span>{" "}
                    — Tim Frick
                  </li>
                  <li>
                    <span className="font-semibold">Lean ICT</span> — The Shift
                    Project
                  </li>
                  <li>
                    <span className="font-semibold">
                      Green IT for Sustainable Business
                    </span>{" "}
                    — Mark O&apos;Neill
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Card className="h-full border-emerald-50">
              <CardHeader className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">
                  Blogs &amp; organisations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <ul className="space-y-1">
                  <li>
                    <a
                      href="https://www.websitecarbon.com/blog/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      Website Carbon Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wholegraindigital.com/blog/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      Wholegrain Digital Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blog.ecosia.org/tag/tech/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      Ecosia Engineering Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.thegreenwebfoundation.org/blog/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      The Green Web Foundation
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Research and checklists */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="h-full border-emerald-50">
              <CardHeader className="flex items-center gap-2">
                <CardTitle className="text-base">
                  Research &amp; reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <ul className="space-y-1 list-disc pl-4">
                  <li>
                    <a
                      href="https://www.iea.org/reports/data-centres-and-data-transmission-networks"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      IEA – Data Centres &amp; Data Transmission Networks
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://theshiftproject.org/en/article/lean-ict-our-new-report/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline-offset-2 hover:underline"
                    >
                      The Shift Project – Lean ICT &amp; Digital Sobriety
                    </a>
                  </li>
                </ul>
                <p className="pt-2 text-xs text-slate-500">
                  These sources underpin many of the assumptions used by tools
                  like WebsiteCarbon and GreenGlide.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Card className="h-full border-emerald-50">
              <CardHeader className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base">
                  Optimisation checklists
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div>
                  <p className="mb-1 font-semibold text-slate-800">
                    Frontend
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-xs">
                    <li>Compress and resize images (WebP/AVIF)</li>
                    <li>Use lazy loading for below-the-fold media</li>
                    <li>Remove unused CSS and JS</li>
                    <li>Use system or variable fonts</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-slate-800">
                    Backend &amp; hosting
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-xs">
                    <li>Choose green or low‑carbon hosting providers</li>
                    <li>Cache pages and API responses aggressively</li>
                    <li>Use CDNs close to your users</li>
                    <li>Profile and optimise heavy endpoints</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* LearnCarbon inline section reused */}
        <LearnCarbon />

        {/* Back link */}
        <div className="mt-10 text-center text-sm">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-2 text-emerald-700 hover:bg-emerald-50"
          >
            ← Back to analysis
          </Link>
        </div>
      </div>
    </div>
  );
}


