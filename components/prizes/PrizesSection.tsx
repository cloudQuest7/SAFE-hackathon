"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────
const TOTAL_POOL = "₹1,00,000+";

const HERO_PRIZES = [
  {
    id: "hw",
    rank: "01",
    tag: "HARDWARE",
    label: "Overall Winner",
    sublabel: "Hardware Track",
    amount: "₹[Amount]",
    perk: "Incubation Support + Mentorship",
    accent: "#c9581f",
  },
  {
    id: "sw",
    rank: "02",
    tag: "SOFTWARE",
    label: "Overall Winner",
    sublabel: "Software Track",
    amount: "₹[Amount]",
    perk: "Incubation Support + Mentorship",
    accent: "#4a7c59",
  },
];

const TIER_PRIZES = [
  { id: "track",    rank: "03", tag: "TRACKS",   label: "Track Winners",      amount: "₹[Amount]", note: "Per winning track" },
  { id: "runner",   rank: "04", tag: "RUNNER-UP", label: "Runner-Up Teams",   amount: "₹[Amount]", note: "Each runner-up team" },
  { id: "women",    rank: "05", tag: "SPECIAL",   label: "Best All-Women Team", amount: "₹[Amount]", note: "Special recognition" },
  { id: "freshman", rank: "06", tag: "SPECIAL",   label: "Best Freshman Team", amount: "₹[Amount]", note: "Special recognition" },
];

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedAmount({ amount, className }: { amount: string; className?: string }) {
  return <span className={className}>{amount}</span>;
}

// ── Hero prize card (large) ───────────────────────────────────────────────────
function HeroPrizeCard({ prize, index }: { prize: typeof HERO_PRIZES[0]; index: number }) {
  const isLeft = index === 0;

  return (
    <div
      className="prize-hero-card group relative overflow-hidden flex flex-col justify-between min-h-[360px] lg:min-h-[440px] cursor-default"
      style={{
        background: "rgba(10,14,10,0.85)",
        border: `1px solid ${prize.accent}22`,
        backdropFilter: "blur(8px)",
        willChange: "transform",
      }}
    >
      {/* Animated background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at ${isLeft ? "bottom left" : "bottom right"}, ${prize.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
        style={{ background: prize.accent, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      />

      {/* Corner bracket decorations */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-20 group-hover:opacity-60 transition-opacity duration-500" style={{ borderColor: prize.accent }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-20 group-hover:opacity-60 transition-opacity duration-500" style={{ borderColor: prize.accent }} />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between p-6 pb-0">
        <span
          className="text-[9px] tracking-[0.3em] opacity-30"
          style={{ fontFamily: "'Share Tech Mono', monospace", color: prize.accent }}
        >
          /{prize.rank}
        </span>
        <span
          className="text-[8px] tracking-[0.2em] px-2 py-1 border"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: prize.accent,
            borderColor: `${prize.accent}50`,
          }}
        >
          {prize.tag}
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 px-6 py-4 flex-1 flex flex-col justify-center">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-1 opacity-50 text-[#d8e8d0]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
        >
          {prize.label}
        </p>
        <p
          className="text-[12px] tracking-[0.15em] uppercase mb-6 opacity-70"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: prize.accent }}
        >
          {prize.sublabel}
        </p>

        {/* Amount — the hero */}
        <div
          className="leading-none mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
            letterSpacing: "0.02em",
            color: "#e8f0e0",
          }}
        >
          <AnimatedAmount amount={prize.amount} />
        </div>
      </div>

      {/* Bottom perk */}
      <div className="relative z-10 px-6 pb-6">
        <div className="h-px mb-4 opacity-10" style={{ background: prize.accent }} />
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full" style={{ background: prize.accent }} />
          <p
            className="text-[9px] tracking-[0.15em] uppercase opacity-50 text-[#d8e8d0]"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            {prize.perk}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Tier prize row ────────────────────────────────────────────────────────────
function TierPrizeRow({ prize, index }: { prize: typeof TIER_PRIZES[0]; index: number }) {
  return (
    <div
      className="prize-tier-row group relative flex items-center justify-between gap-4 py-5 px-6 border-b border-[#1e2a1c] cursor-default hover:bg-[#0d160d]/60 transition-colors duration-300 overflow-hidden"
    >
      {/* Hover left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#c9581f] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />

      {/* Left: rank + label */}
      <div className="flex items-center gap-4 min-w-0">
        <span
          className="text-[9px] tracking-[0.25em] text-[#3a5238]/40 shrink-0"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {prize.rank}
        </span>
        <span
          className="text-[8px] tracking-[0.18em] px-2 py-0.5 border border-[#3a5238]/30 text-[#4a7c59]/60 group-hover:border-[#c9581f]/40 group-hover:text-[#c9581f] transition-colors duration-300 shrink-0"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {prize.tag}
        </span>
        <span
          className="text-[13px] tracking-[0.06em] uppercase text-[#6a8a68] group-hover:text-[#c0d4be] transition-colors duration-300 truncate"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          {prize.label}
        </span>
      </div>

      {/* Right: note + amount */}
      <div className="flex items-center gap-6 shrink-0">
        <span
          className="text-[9px] tracking-[0.12em] text-[#3a5238]/40 hidden sm:block"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {prize.note}
        </span>
        <span
          className="text-[1.6rem] text-[#8aaa88] group-hover:text-[#d8e8d0] transition-colors duration-300"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
        >
          {prize.amount}
        </span>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function PrizePoolSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Section label + header lines reveal
      gsap.from(".prize-header-line", {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".prize-header", start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from(".prize-badge", {
        y: -20, opacity: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".prize-header", start: "top 82%", toggleActions: "play none none none" },
      });

      // Total pool shimmer reveal
      gsap.from(".prize-total", {
        opacity: 0, scale: 0.94, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".prize-total", start: "top 85%", toggleActions: "play none none none" },
      });

      // Hero cards — slide up staggered
      gsap.from(".prize-hero-card", {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".prize-hero-grid", start: "top 78%", toggleActions: "play none none none" },
      });

      // Tier rows — slide in from right
      gsap.from(".prize-tier-row", {
        x: 40, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".prize-tier-list", start: "top 80%", toggleActions: "play none none none" },
      });

      // Divider line draws in
      gsap.from(".prize-divider", {
        scaleX: 0, transformOrigin: "left center", duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".prize-divider", start: "top 88%", toggleActions: "play none none none" },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Share+Tech+Mono&display=swap');

        @keyframes prize-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .prize-shimmer {
          background: linear-gradient(90deg, #c9581f 0%, #f5a06a 35%, #c9581f 55%, #f5a06a 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: prize-shimmer 3.5s linear infinite;
        }

        @keyframes badge-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,88,31,0.4); }
          50%       { opacity: 0.6; box-shadow: 0 0 0 6px rgba(201,88,31,0); }
        }

        .prize-dot { animation: badge-pulse 2s ease-in-out infinite; }

        .prize-hex-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34z' fill='none' stroke='rgba(74,124,89,0.045)' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34z' fill='none' stroke='rgba(74,124,89,0.045)' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 56px 100px;
        }

        @keyframes float-glyph {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50%       { transform: translateY(-12px) rotate(-12deg); }
        }
        .prize-float { animation: float-glyph 6s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-[#080c08] overflow-hidden py-24 lg:py-32"
      >
        {/* Hex grid BG */}
        <div className="prize-hex-bg absolute inset-0 z-0 opacity-100" />

        {/* Radial glow center */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(74,124,89,0.06)_0%,transparent_100%)]" />

        {/* Ghost background text */}
        <div
          className="prize-float absolute -right-12 top-8 select-none pointer-events-none z-0"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(10rem, 30vw, 32rem)",
            lineHeight: 0.8,
            color: "transparent",
            WebkitTextStroke: "1px rgba(74,124,89,0.04)",
            letterSpacing: "-0.02em",
          }}
        >
          WIN
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">

          {/* ── Header ── */}
          <div className="prize-header mb-16">

            {/* Badge */}
            <div className="prize-badge flex items-center gap-3 mb-6">
              <div
                className="prize-dot w-1.5 h-1.5 rounded-full bg-[#c9581f]"
              />
              <span
                className="text-[#c9581f] text-[9px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Operation Reward · Prize Breakdown
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9581f]/25 to-transparent max-w-28" />
              <span
                className="text-[#3a5238]/40 text-[9px] tracking-[0.2em]"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                03 / 04
              </span>
            </div>

            {/* Heading + pool side by side */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="overflow-hidden">
                {["PRIZES &", "GLORY."].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <div
                      className="prize-header-line leading-none"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(4rem, 10vw, 10rem)",
                        letterSpacing: "0.02em",
                        color: i === 0 ? "#d8e8d0" : "transparent",
                        WebkitTextStroke: i === 1 ? "1px rgba(74,124,89,0.5)" : undefined,
                        lineHeight: 0.9,
                      }}
                    >
                      {line}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total pool callout card */}
              <div
                className="prize-total flex-shrink-0 border border-[#c9581f]/20 p-5 lg:p-7 bg-[#0a0f09]/80"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <p
                  className="text-[8px] tracking-[0.3em] text-[#c9581f]/60 uppercase mb-2"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  Total Prize Pool
                </p>
                <p
                  className="prize-shimmer leading-none mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.8rem, 5vw, 5rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {TOTAL_POOL}
                </p>
                <p
                  className="text-[8px] tracking-[0.18em] text-[#3a5238]/50 uppercase"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  in prizes + perks + incubation
                </p>
              </div>
            </div>
          </div>

          {/* ── Orange divider ── */}
          <div
            className="prize-divider h-px mb-12"
            style={{ background: "linear-gradient(90deg, #c9581f, rgba(201,88,31,0.15) 60%, transparent)" }}
          />

          {/* ── Hero prize cards: 2 col ── */}
          <div className="prize-hero-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {HERO_PRIZES.map((prize, i) => (
              <HeroPrizeCard key={prize.id} prize={prize} index={i} />
            ))}
          </div>

          {/* ── Tier prizes: table-style list ── */}
          <div
            className="prize-tier-list border border-[#1e2a1c] overflow-hidden"
            style={{ background: "rgba(8,12,8,0.6)", backdropFilter: "blur(6px)" }}
          >
            {/* List header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e2a1c] bg-[#0a0f09]/80">
              <span
                className="text-[8px] tracking-[0.25em] text-[#3a5238]/50 uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                — Category Prizes
              </span>
              <span
                className="text-[8px] tracking-[0.25em] text-[#3a5238]/50 uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Award
              </span>
            </div>

            {TIER_PRIZES.map((prize, i) => (
              <TierPrizeRow key={prize.id} prize={prize} index={i} />
            ))}
          </div>

          {/* ── Bottom note ── */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#1e2a1c]">
            <p
              className="text-[#3a5238]/35 text-[9px] tracking-[0.15em] uppercase max-w-sm"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              Prize amounts subject to confirmation. Final details at mission briefing.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-px h-4 bg-[#c9581f]/30" />
              <span
                className="text-[#c9581f]/40 text-[9px] tracking-[0.2em] uppercase"
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