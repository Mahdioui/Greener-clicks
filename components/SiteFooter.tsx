"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 text-xs text-slate-600 sm:grid-cols-[2fr,1.5fr,1.5fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Green Click
            </p>
            <p className="mt-2 max-w-xs text-[12px]">
              Measure the CO₂e footprint of your pages and turn the results into
              a short, actionable brief for greener code.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800">
              Explore
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-[12px] hover:text-slate-900 hover:underline underline-offset-4"
                >
                  Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-[12px] hover:text-slate-900 hover:underline underline-offset-4"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-[12px] hover:text-slate-900 hover:underline underline-offset-4"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-[12px] hover:text-slate-900 hover:underline underline-offset-4"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800">
              About CO₂e
            </p>
            <p className="mt-2 max-w-xs text-[12px]">
              CO₂‑equivalent bundles the impact of different greenhouse gases as
              if they were all CO₂, so one number can describe your footprint.
            </p>
            <p className="mt-2 text-[11px]">
              Built as a learning tool inspired by{" "}
              <a
                href="https://www.websitecarbon.com/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline underline-offset-4"
              >
                Website Carbon
              </a>{" "}
              and other open sustainability resources.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-dashed border-slate-200 pt-4 text-[11px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Green Click. Built for greener web experiences.</p>
          <p>
            This is an educational estimate, not a formal emissions inventory.
          </p>
        </div>
      </div>
    </footer>
  );
}


