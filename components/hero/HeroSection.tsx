"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  "HARDWARE", "·", "SOFTWARE", "·", "DEFENSE", "·",
  "INNOVATION", "·", "BUILD", "·", "BREAK", "·", "DEPLOY", "·",
];

// ── Split text into char spans ─────────────────────────────────────────────────
function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`split-word inline-block overflow-hidden ${className ?? ""}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="char inline-block" style={{ willChange: "transform" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

// ── Scrolling ticker belt ──────────────────────────────────────────────────────
function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="hero-ticker w-full overflow-hidden py-2 border-y border-[#4a7c59]/20 my-1">
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{ animation: "ticker-run 18s linear infinite", width: "max-content" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className={`text-[11px] tracking-[0.25em] shrink-0 ${
              t === "·" ? "text-[#c9581f]" : "text-[#4a7c59]/70"
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Entry animation
  useGSAP(
    () => {
      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ delay: 0.15 });

      // Badge
      tl.from(".hero-badge", {
        y: -24, opacity: 0, duration: 0.7, ease: "power3.out",
      });

      // Line 1 chars — "SAFE"
      tl.from(".hero-l1 .char", {
        y: 110, opacity: 0, duration: 1, stagger: 0.05, ease: "expo.out",
      }, "-=0.4");

      // Ticker
      tl.from(".hero-ticker", { opacity: 0, duration: 0.4 }, "-=0.5");

      // Line 2 — "HACK" slides from left
      tl.from(".hero-l2", {
        x: -80, opacity: 0, duration: 0.9, ease: "expo.out",
      }, "-=0.55");

      // Line 3 chars — "ATHON"
      tl.from(".hero-l3 .char", {
        y: 110, opacity: 0, duration: 1, stagger: 0.05, ease: "expo.out",
      }, "-=0.65");

      // Bottom strip
      tl.from(".hero-bottom", {
        y: 32, opacity: 0, duration: 0.7, ease: "power3.out",
      }, "-=0.4");

      // Scroll indicator
      tl.from(".hero-scroll-indicator", {
        opacity: 0, duration: 0.5,
      }, "-=0.2");
    },
    { scope: sectionRef }
  );

  // ── Scroll-driven effects
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content clips away as hero exits
      gsap.to(contentRef.current, {
        clipPath: "inset(0 0 100% 0)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // ── Magnetic CTA
  useEffect(() => {
    const btn = document.querySelector<HTMLElement>(".hero-cta");
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Share+Tech+Mono&display=swap');

        @keyframes ticker-run {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes badge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        @keyframes scroll-drop {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @keyframes noise-drift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        .hero-bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          animation: noise-drift 8s steps(2) infinite;
        }

        .hero-scroll-line {
          animation: scroll-drop 2s ease-in-out infinite;
        }

        .hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(201,88,31,0.5);
          padding: 12px 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d8e8d0;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
          cursor: pointer;
        }

        .hero-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9581f;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: -1;
        }

        .hero-cta:hover::before { transform: scaleX(1); }
        .hero-cta:hover { border-color: #c9581f; color: #fff; }

        .hero-hex-grid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34z' fill='none' stroke='rgba(74,124,89,0.06)' stroke-width='1'/%3E%3Cpath d='M28 100L0 84V50l28-16 28 16v34z' fill='none' stroke='rgba(74,124,89,0.06)' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 56px 100px;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-section relative h-dvh w-screen overflow-hidden bg-[#080c08]"
      >
        {/* ── Background layer ── */}
        <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
          {/* Dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f09] via-[#080c08] to-[#050805]" />
          {/* Hex grid */}
          <div className="hero-hex-grid absolute inset-0 opacity-100" />
          {/* Noise */}
          <div className="hero-bg-noise absolute inset-0" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,6,4,0.85)_100%)]" />
        </div>

        {/* ── Noise overlay ── */}
        <div className="hero-bg-noise absolute inset-0 z-[3] pointer-events-none" />

        {/* ── Main content ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          {/* Top badge */}
          <div className="flex items-center justify-between px-6 lg:px-12 pt-8">
            <div className="hero-badge flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#c9581f]"
                style={{ animation: "badge-pulse 1.8s ease-in-out infinite", boxShadow: "0 0 6px #c9581f" }}
              />
              <span
                className="text-[#c9581f]/80 text-[9px] tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Innovation Cell PCE · Est. 2025
              </span>
            </div>

            {/* Top-right section counter */}
            <span
              className="hero-badge text-[#3a5238]/50 text-[9px] tracking-[0.2em]"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              01 / 04
            </span>
          </div>

          {/* Hero typography — center stage */}
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 mt-4">

            {/* LINE 1: SAFE */}
            <div
              className="hero-l1 leading-none overflow-hidden"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 18rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
              }}
            >
              <SplitChars text="SAFE" className="text-[#d8e8d0]" />
            </div>

            {/* Ticker between lines */}
            <Ticker />

            {/* LINE 2: HACK — outlined, slides from left */}
            <div
              className="hero-l2 leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 18rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
                color: "transparent",
                WebkitTextStroke: "clamp(1px, 0.15vw, 2px) rgba(74,124,89,0.55)",
              }}
            >
              HACK
            </div>

            {/* LINE 3: ATHON */}
            <div
              className="hero-l3 leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 18rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
              }}
            >
              <SplitChars text="ATHON" className="text-[#d8e8d0]" />
            </div>
          </div>

          {/* ── Bottom strip ── */}
          <div className="hero-bottom px-6 lg:px-12 pb-8 pt-6 border-t border-[#2e3a2c]/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

              {/* Left info */}
              <div className="flex gap-8">
                <div>
                  <p
                    className="text-[#3a5238]/50 text-[8px] tracking-[0.22em] uppercase mb-0.5"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    Location
                  </p>
                  <p
                    className="text-[#7a9a78] text-[12px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                  >
                    New Panvel, MH
                  </p>
                </div>
                <div>
                  <p
                    className="text-[#3a5238]/50 text-[8px] tracking-[0.22em] uppercase mb-0.5"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    Date
                  </p>
                  <p
                    className="text-[#7a9a78] text-[12px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                  >
                    [Date TBA]
                  </p>
                </div>
                <div>
                  <p
                    className="text-[#3a5238]/50 text-[8px] tracking-[0.22em] uppercase mb-0.5"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    Duration
                  </p>
                  <p
                    className="text-[#7a9a78] text-[12px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                  >
                    36 Hours
                  </p>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex items-center gap-4">
                <button className="hero-cta rounded-none">
                  <span>Register Now</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="#about"
                  className="text-[#4a6248] hover:text-[#8ab088] text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="hero-scroll-indicator absolute bottom-10 right-10 z-20 flex flex-col items-center gap-2 hidden lg:flex">
          <span
            className="text-[#3a5238]/40 text-[8px] tracking-[0.28em] uppercase"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Scroll to Brief
          </span>
          <div className="w-px h-12 bg-[#3a5238]/20 overflow-hidden">
            <div className="hero-scroll-line w-full h-full bg-[#4a7c59]" />
          </div>
        </div>

      </section>
    </>
  );
}