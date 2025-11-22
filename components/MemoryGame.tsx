"use client";

import React, { useEffect, useState } from "react";
import { Leaf, Globe2, TreePine, CloudFog } from "lucide-react";

export type MemoryCardSymbol = "leaf" | "globe" | "tree" | "cloud";

interface MemoryCard {
  id: number;
  symbol: MemoryCardSymbol;
  flipped: boolean;
  matched: boolean;
}

const BASE_DECK: MemoryCard[] = [
  { id: 0, symbol: "leaf", flipped: false, matched: false },
  { id: 1, symbol: "leaf", flipped: false, matched: false },
  { id: 2, symbol: "globe", flipped: false, matched: false },
  { id: 3, symbol: "globe", flipped: false, matched: false },
  { id: 4, symbol: "tree", flipped: false, matched: false },
  { id: 5, symbol: "tree", flipped: false, matched: false },
  { id: 6, symbol: "cloud", flipped: false, matched: false },
  { id: 7, symbol: "cloud", flipped: false, matched: false },
];

const SYMBOL_META: Record<
  MemoryCardSymbol,
  {
    label: string;
    fact: string;
    emoji: string;
    Icon: React.ComponentType<{ className?: string }>;
    bg: string;
  }
> = {
  leaf: {
    label: "Green hosting",
    fact: "Green hosting uses renewable energy to cut data‑centre CO₂e emissions.",
    emoji: "🌱",
    Icon: Leaf,
    bg: "from-emerald-50 to-emerald-100",
  },
  globe: {
    label: "Global impact",
    fact: "If the internet were a country, it would rival aviation in CO₂e emissions.",
    emoji: "🌍",
    Icon: Globe2,
    bg: "from-sky-50 to-sky-100",
  },
  tree: {
    label: "Trees & offsets",
    fact: "An average tree absorbs roughly 21 kg of CO₂e per year.",
    emoji: "🌲",
    Icon: TreePine,
    bg: "from-lime-50 to-lime-100",
  },
  cloud: {
    label: "Data in the cloud",
    fact: "“The cloud” still runs on physical servers and networks powered by electricity.",
    emoji: "☁️",
    Icon: CloudFog,
    bg: "from-slate-50 to-slate-100",
  },
};

interface MemoryGameProps {
  /** Optional callback fired when a pair is matched, with the associated fact. */
  onMatchFact?: (fact: string) => void;
  /** Layout variant: compact for loading, wide for results page. */
  variant?: "compact" | "wide";
}

/**
 * MemoryGame
 * ----------
 * Lightweight card‑matching game.
 * - Compact variant: small grid for the loading overlay.
 * - Wide variant: larger horizontal cards with embedded facts for the results page.
 */
export const MemoryGame: React.FC<MemoryGameProps> = ({
  onMatchFact,
  variant = "compact",
}) => {
  // Use a deterministic initial state on the server to avoid hydration
  // mismatches, then shuffle on the client after mount.
  const [cards, setCards] = useState<MemoryCard[]>(BASE_DECK);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  useEffect(() => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (index: number) => {
    setCards((prev) => {
      const card = prev[index];
      if (card.matched || card.flipped) return prev;

      const updated = [...prev];
      updated[index] = { ...card, flipped: true };
      const nextFlipped = [...flippedIndices, index];

      if (nextFlipped.length === 2) {
        const [aIdx, bIdx] = nextFlipped;
        const a = updated[aIdx];
        const b = updated[bIdx];

        if (a.symbol === b.symbol) {
          updated[aIdx] = { ...a, matched: true };
          updated[bIdx] = { ...b, matched: true };
          const fact = SYMBOL_META[a.symbol].fact;
          onMatchFact?.(fact);
        } else {
          setTimeout(() => {
            setCards((current) => {
              const snapshot = [...current];
              const ca = snapshot[aIdx];
              const cb = snapshot[bIdx];
              if (ca && !ca.matched) snapshot[aIdx] = { ...ca, flipped: false };
              if (cb && !cb.matched) snapshot[bIdx] = { ...cb, flipped: false };
              return snapshot;
            });
          }, 900);
        }

        setFlippedIndices([]);
      } else {
        setFlippedIndices(nextFlipped);
      }

      return updated;
    });
  };

  const allMatched = cards.every((c) => c.matched);

  // Reset game when all cards are matched so users can keep playing
  useEffect(() => {
    if (allMatched) {
      const t = setTimeout(() => {
        setCards(
          [...BASE_DECK]
            .map((c) => ({ ...c, flipped: false, matched: false }))
            .sort(() => Math.random() - 0.5)
        );
        setFlippedIndices([]);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [allMatched]);

  const isWide = variant === "wide";

  return (
    <div className="w-full rounded-2xl bg-emerald-50/60 p-4 shadow-inner">
      <p className="mb-2 text-xs font-semibold text-emerald-800">
        Match the green‑web icons to unlock quick facts about digital emissions.
      </p>
      <div
        className={
          isWide
            ? "grid grid-cols-2 gap-4 sm:grid-cols-4"
            : "grid grid-cols-3 gap-3"
        }
      >
        {cards.map((card, index) => {
          const meta = SYMBOL_META[card.symbol];
          const isFlipped = card.flipped || card.matched;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(index)}
              disabled={card.matched}
                className={`relative w-full ${
                  isWide ? "h-28 sm:h-32" : "h-20"
                }`}
            >
              <div className="relative h-full w-full [perspective:800px]">
                <div
                  className={`relative h-full w-full transform-gpu rounded-xl shadow-sm transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front face */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 [backface-visibility:hidden]">
                    <span className="text-lg" aria-hidden="true">
                      🍃
                    </span>
                  </div>
                  {/* Back face */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br ${meta.bg} [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm">
                      <meta.Icon
                        className={`h-5 w-5 ${
                          card.matched ? "text-emerald-600" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <span className="text-sm" aria-hidden="true">
                      {meta.emoji}
                    </span>
                    <span className="text-[10px] font-medium text-slate-700">
                      {meta.label}
                    </span>
                    {isWide && (
                      <p className="px-2 text-[9px] text-slate-600 text-center">
                        {meta.fact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-emerald-700">
        Flip two cards to find a match. Each pair reveals a quick tip about making the
        web greener and lowering CO₂e.
      </p>
    </div>
  );
};
