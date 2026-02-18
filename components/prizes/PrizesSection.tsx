"use client";

import { useRef, useEffect, useState } from "react";
// Install: npx shadcn@latest add @animate-ui/components-backgrounds-hexagon
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Prize {
  id: string;
  rank: string;
  label: string;
  amount: string;
  perk?: string;
  highlight?: boolean; // makes it the "hero" card
  tag?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
export const PRIZE_DATA: Prize[] = [
  {
    id: "hw-winner",
    rank: "01",
    label: "Overall Winner",
    amount: "₹[Amount]",
    perk: "Hardware Track + Incubation Support",
    highlight: true,
    tag: "HARDWARE",
  },
  {
    id: "sw-winner",
    rank: "02",
    label: "Overall Winner",
    amount: "₹[Amount]",
    perk: "Software Track + Incubation Support",
    highlight: true,
    tag: "SOFTWARE",
  },
  {
    id: "track",
    rank: "03",
    label: "Track Winners",
    amount: "₹[Amount]",
    perk: "Per track",
    tag: "TRACKS",
  },
  {
    id: "runner",
    rank: "04",
    label: "Runner-Up Teams",
    amount: "₹[Amount]",
    perk: "Each team",
    tag: "RUNNER-UP",
  },
  {
    id: "women",
    rank: "05",
    label: "Best All-Women Team",
    amount: "₹[Amount]",
    tag: "SPECIAL",
  },
  {
    id: "freshman",
    rank: "06",
    label: "Best Freshman Team",
    amount: "₹[Amount]",
    tag: "SPECIAL",
  },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function CountUp({ target, inView }: { target: string; inView: boolean }) {
  // If it's a placeholder just render as-is
  if (target.includes("[")) return <span>{target}</span>;
  return <span>{inView ? target : "₹0"}</span>;
}

// ─── Prize Card ───────────────────────────────────────────────────────────────
function PrizeCard({ prize, index }: { prize: Prize; index: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isHighlight = prize.highlight;

  return (
    <div
      ref={ref}
      className={`
        group relative flex flex-col justify-between
        border transition-all duration-500 overflow-hidden
        ${isHighlight
          ? "border-[#c9581f]/60 bg-[#0e0c08]/80 shadow-[0_0_40px_rgba(201,88,31,0.12)]"
          : "border-[#2e3a2c]/80 bg-[#080c08]/70 hover:border-[#4a7c59]/50"
        }
        rounded-sm p-6 min-h-[200px]
      `}
      style={{
        animationDelay: `${index * 80}ms`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* top row: rank + tag */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-[#3a5238]/60 text-[11px] tracking-[0.3em] font-mono"
        >
          /{prize.rank}
        </span>
        <span
          className={`
            text-[8px] tracking-[0.22em] px-2 py-0.5 border font-mono
            ${isHighlight
              ? "border-[#c9581f]/50 text-[#c9581f]"
              : "border-[#3a5238]/40 text-[#4a7c59]/70"
            }
          `}
        >
          {prize.tag}
        </span>
      </div>

      {/* label */}
      <p
        className={`
          text-[11px] tracking-[0.14em] uppercase mb-3 transition-colors duration-300
          ${isHighlight ? "text-[#9ab098]" : "text-[#4a6248] group-hover:text-[#7a9878]"}
        `}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
      >
        {prize.label}
      </p>

      {/* amount — the hero moment */}
      <div
        className={`
          text-[2.2rem] leading-none font-bold mb-2 transition-colors duration-300
          ${isHighlight ? "text-[#e8f0e0]" : "text-[#5a7a58] group-hover:text-[#8ab088]"}
        `}
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
      >
        <CountUp target={prize.amount} inView={inView} />
      </div>

      {/* perk */}
      {prize.perk && (
        <p
          className="text-[10px] tracking-[0.1em] text-[#3a5238]/70 mt-auto pt-3 border-t border-[#2e3a2c]/50"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          + {prize.perk}
        </p>
      )}

      {/* highlight glow bottom line */}
      {isHighlight && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9581f] to-transparent" />
      )}

      {/* hover corner bracket */}
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#4a7c59]/0 group-hover:border-[#4a7c59]/40 transition-all duration-300" />
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#4a7c59]/0 group-hover:border-[#4a7c59]/40 transition-all duration-300" />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function PrizePoolSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Share+Tech+Mono&display=swap');

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .blink { animation: blink 1s step-end infinite; }

        @keyframes prize-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .prize-fade { animation: prize-fade-up 0.6s ease both; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #c9581f 0%,
            #f0a070 40%,
            #c9581f 60%,
            #f0a070 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#080c08]">

        {/* ── Hexagon background ── */}
        <div className="absolute inset-0 z-0 opacity-30">
          <HexagonBackground />
        </div>

        {/* ── Dark gradient overlays to frame the hex bg ── */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#080c08] via-transparent to-[#080c08] pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080c08]/80 via-transparent to-[#080c08]/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-24">

          {/* ── Header ── */}
          <div className="mb-16">
            {/* status line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9581f] shadow-[0_0_8px_#c9581f]" />
              <span
                className="text-[#c9581f] text-[9px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                OPERATION REWARD / PRIZE POOL
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9581f]/30 to-transparent max-w-32" />
              <span
                className="ml-auto text-[#3a5238]/60 text-[9px] tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                {PRIZE_DATA.length} CATEGORIES
                <span className="blink ml-0.5">_</span>
              </span>
            </div>

            {/* big heading */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2
                  className="leading-none mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3.5rem, 9vw, 8rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <span className="text-[#d8e8d0]">PRIZES </span>
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(74,124,89,0.4)" }}
                  >
                    &amp;
                  </span>
                  <span className="text-[#d8e8d0]"> GLORY</span>
                </h2>

                <p
                  className="text-[#4a6248] text-[11px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Compete. Build. Claim your reward.
                </p>
              </div>

              {/* total pool callout */}
              <div className="flex flex-col items-start lg:items-end">
                <span
                  className="text-[9px] tracking-[0.25em] text-[#4a6248] uppercase mb-1"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  Total Prize Pool
                </span>
                <span
                  className="shimmer-text leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  ₹[Amount]
                </span>
                <span
                  className="text-[9px] tracking-[0.18em] text-[#3a5238]/50 mt-1 uppercase"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  in prizes &amp; perks
                </span>
              </div>
            </div>

            {/* divider */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9581f]/40 via-[#4a7c59]/20 to-transparent" />
              <span className="text-[#3a5238]/40 text-[9px] font-mono tracking-widest">◆</span>
            </div>
          </div>

          {/* ── Prize grid ── */}
          {/* Top row: 2 highlight cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {PRIZE_DATA.filter((p) => p.highlight).map((prize, i) => (
              <PrizeCard key={prize.id} prize={prize} index={i} />
            ))}
          </div>

          {/* Bottom row: 4 standard cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRIZE_DATA.filter((p) => !p.highlight).map((prize, i) => (
              <PrizeCard key={prize.id} prize={prize} index={i + 2} />
            ))}
          </div>

          {/* ── Bottom note ── */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#2e3a2c]/50">
            <p
              className="text-[#3a5238]/50 text-[10px] tracking-[0.15em] uppercase max-w-md"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              Prize amounts subject to change. Final details announced at mission briefing.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#c9581f]/60" />
              <span
                className="text-[#c9581f]/60 text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                More perks TBA
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}