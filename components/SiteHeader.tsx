"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

const links = [
  { href: "/", label: "Analyzer" },
  { href: "/learn", label: "Learn" },
  { href: "/methodology", label: "How it works" },
  { href: "/history", label: "History" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            Green Click
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-xs text-slate-600">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-1 transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


