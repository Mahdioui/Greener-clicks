"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Cpu, Network, Server, Code2 } from "lucide-react";

/**
 * ImpactExplanation
 * -----------------
 * Explains Green IT and where website CO₂ comes from in simple, visual terms.
 * Used on the learn/resources page and can be reused on results pages.
 */
export function ImpactExplanation() {
  return (
    <section className="mt-12 space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Green IT
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Where does website CO₂ come from?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
          Every page view travels through data centres, networks, and devices.
          Each step consumes electricity, and if that electricity is not
          renewable, it emits CO₂.
        </p>
      </div>

      {/* Simple infographic row */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="h-full border-emerald-50 bg-white/80 shadow-sm backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Server className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Data centres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>
                Servers store your code and assets, run app logic, and serve
                pages. Their electricity use depends on efficiency and grid mix.
              </p>
              <div className="relative mt-2 h-2 w-full rounded-full bg-emerald-50">
                <div className="h-2 w-2/3 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-emerald-700">
                Optimise backends, queries, and hosting to reduce server load.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <Card className="h-full border-emerald-50 bg-white/80 shadow-sm backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                <Network className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Networks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>
                Every extra kilobyte travels through routers, cables, and
                mobile towers. Heavy pages mean more data, more energy, and
                more CO₂.
              </p>
              <div className="relative mt-2 h-20 w-full rounded-2xl bg-sky-50">
                <div className="absolute left-2 top-1/2 h-2 w-[15%] -translate-y-1/2 rounded-full bg-sky-400" />
                <div className="absolute left-[40%] top-1/2 h-2 w-[25%] -translate-y-1/2 rounded-full bg-sky-500" />
                <div className="absolute left-[80%] top-1/2 h-2 w-[10%] -translate-y-1/2 rounded-full bg-sky-300" />
              </div>
              <p className="text-xs text-sky-700">
                Shrink assets, cache responses, and use CDNs to cut traffic.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <Card className="h-full border-emerald-50 bg-white/80 shadow-sm backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Cpu className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Devices & code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>
                JavaScript, animations, and layout all use CPU and GPU on
                users&apos; devices. Inefficient code drains batteries and
                wastes energy.
              </p>
              <div className="mt-2 flex items-end gap-1">
                {[0.4, 0.7, 1].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-full bg-gradient-to-t from-amber-400 to-emerald-400"
                    style={{ height: `${h * 2.5}rem` }}
                  />
                ))}
              </div>
              <p className="text-xs text-amber-700">
                Ship less JS, avoid heavy loops, and keep interactions simple.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Code efficiency strip */}
      <Card className="border-emerald-50 bg-gradient-to-r from-emerald-50 to-sky-50">
        <CardContent className="flex flex-col gap-3 p-4 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">How code efficiency affects CO₂</p>
              <p className="text-xs text-slate-600">
                Clean, minimal code means fewer bytes over the network and less
                work on every device. That translates directly into lower
                electricity use and a smaller footprint.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}


