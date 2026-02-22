"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ORANGE = "#c9581f";
const OLIVE  = "#556b2f";

// ─── SPONSOR DATA ─────────────────────────────────────────────────────────────
// Replace name/url/tier with real sponsors. "desc" is the hover whisper line.
const TITLE_SPONSORS = [
  { name: "DRDO", desc: "Defence Research & Development Organisation", url: "#" },
  { name: "HAL", desc: "Hindustan Aeronautics Limited", url: "#" },
];

const CO_SPONSORS = [
  { name: "Tata Advanced Systems", desc: "Aerospace & Defence", url: "#" },
  { name: "BEL", desc: "Bharat Electronics Limited", url: "#" },
  { name: "L&T Defence", desc: "Engineering & Construction", url: "#" },
];

const COMMUNITY = [
  { name: "GitHub Education", url: "#" },
  { name: "AWS Activate", url: "#" },
  { name: "Wolfram Alpha", url: "#" },
  { name: "Postman", url: "#" },
  { name: "Replit", url: "#" },
];

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [...TITLE_SPONSORS, ...CO_SPONSORS, ...COMMUNITY].map(s => s.name);

function SponsorMarquee() {
  const rep = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: `${OLIVE}25`, userSelect: "none" }}>
      <div
        className="flex items-center whitespace-nowrap py-4"
        style={{ animation: "sp-ticker 28s linear infinite", width: "max-content" }}
      >
        {rep.map((name, i) => (
          <span key={i} className="shrink-0 flex items-center gap-6 mx-6">
            <span
              className="text-[11px] tracking-[0.28em] uppercase font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "rgba(228,221,211,0.2)" }}
            >
              {name}
            </span>
            <span style={{ color: `${OLIVE}55`, fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── TITLE SPONSOR BLOCK ──────────────────────────────────────────────────────
function TitleSponsor({ name, desc, url }: { name: string; desc: string; url: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="title-sp-block relative flex flex-col justify-between overflow-hidden group"
      style={{
        border: `1px solid ${hov ? OLIVE + "55" : "rgba(255,255,255,0.06)"}`,
        padding: "40px 36px",
        textDecoration: "none",
        transition: "border-color 0.4s ease",
        minHeight: 180,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* fill on hover */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${OLIVE}12, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* top-left corner mark */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        width: 10, height: 10,
        borderTop: `1px solid ${OLIVE}${hov ? "AA" : "30"}`,
        borderLeft: `1px solid ${OLIVE}${hov ? "AA" : "30"}`,
        transition: "border-color 0.4s",
      }} />

      {/* tier label */}
      <span
        className="relative z-10 text-[8px] tracking-[0.35em] uppercase mb-auto"
        style={{ fontFamily: "'Share Tech Mono', monospace", color: `${ORANGE}99` }}
      >
        Title Sponsor
      </span>

      {/* name */}
      <div className="relative z-10 mt-8">
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            lineHeight: 0.9,
            color: hov ? "#e4ddd3" : "rgba(228,221,211,0.55)",
            letterSpacing: "0.02em",
            transition: "color 0.35s ease",
          }}
        >
          {name}
        </div>
        {/* desc whisper */}
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: `${OLIVE}${hov ? "CC" : "00"}`,
            textTransform: "uppercase",
            marginTop: 8,
            transition: "color 0.4s ease",
          }}
        >
          {desc}
        </div>
      </div>

      {/* arrow */}
      <svg
        width="14" height="14" viewBox="0 0 14 14" fill="none"
        style={{
          position: "absolute", bottom: 14, right: 14,
          opacity: hov ? 1 : 0,
          transform: hov ? "translate(0,0)" : "translate(-4px,4px)",
          transition: "all 0.35s ease",
        }}
      >
        <path d="M2 12L12 2M12 2H5M12 2V9" stroke={OLIVE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

// ─── CO-SPONSOR ROW ───────────────────────────────────────────────────────────
function CoSponsorRow({ name, desc, url, index }: { name: string; desc: string; url: string; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="co-sp-row relative flex items-center justify-between overflow-hidden group"
      style={{
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        padding: "20px 0",
        textDecoration: "none",
        transition: "padding 0.3s ease",
        paddingLeft: hov ? 12 : 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* hover bg */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${OLIVE}10, transparent)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div className="relative z-10 flex items-center gap-5">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px", letterSpacing: "0.3em",
            color: hov ? `${OLIVE}CC` : `${OLIVE}45`,
            transition: "color 0.3s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              letterSpacing: "0.03em", lineHeight: 1,
              color: hov ? "#e4ddd3" : "rgba(228,221,211,0.45)",
              transition: "color 0.3s",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "8px", letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: hov ? `${OLIVE}BB` : "transparent",
              transition: "color 0.35s ease",
              marginTop: 3,
            }}
          >
            {desc}
          </div>
        </div>
      </div>

      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "9px", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: hov ? `${ORANGE}BB` : "rgba(255,255,255,0.12)",
          transition: "color 0.3s",
        }}
      >
        Co-Sponsor
      </span>
    </a>
  );
}

// ─── COMMUNITY TAG ────────────────────────────────────────────────────────────
function CommunityTag({ name, url }: { name: string; url: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: hov ? "#e4ddd3" : "rgba(228,221,211,0.25)",
        textDecoration: "none",
        borderBottom: `1px solid ${hov ? OLIVE + "60" : "transparent"}`,
        paddingBottom: 1,
        transition: "all 0.25s ease",
        display: "inline-block",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {name}
    </a>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Eyebrow
    gsap.from(".sp-eyebrow", {
      opacity: 0, x: -24, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".sp-eyebrow", start: "top 88%", once: true },
    });

    // Heading
    gsap.from(".sp-heading .sp-word", {
      yPercent: 110, duration: 1.1, stagger: 0.09, ease: "expo.out",
      scrollTrigger: { trigger: ".sp-heading", start: "top 84%", once: true },
    });

    // Title sponsor cards
    gsap.from(".title-sp-block", {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
      scrollTrigger: { trigger: ".title-sp-grid", start: "top 82%", once: true },
    });

    // Co-sponsor rows
    gsap.from(".co-sp-row", {
      x: -40, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".co-sp-list", start: "top 85%", once: true },
    });

    // Community line
    gsap.from(".community-block", {
      opacity: 0, y: 20, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ".community-block", start: "top 88%", once: true },
    });

    // CTA
    gsap.from(".sp-cta-block > *", {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: ".sp-cta-block", start: "top 88%", once: true },
    });
  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Share+Tech+Mono&display=swap');

        @keyframes sp-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes sp-blink  { 0%,100%{opacity:1} 50%{opacity:0} }

        .sp-wrap { background: #0a0908; }

        .sp-cur::after {
          content: '_';
          animation: sp-blink 1s step-end infinite;
          color: ${ORANGE};
        }

        .sp-become-btn {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid ${OLIVE}55;
          padding: 12px 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(228,221,211,0.5);
          text-decoration: none;
          position: relative; overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
        }
        .sp-become-btn::before {
          content:''; position:absolute; inset:0;
          background: ${OLIVE}22;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .sp-become-btn:hover::before { transform: scaleX(1); }
        .sp-become-btn:hover { color: #e4ddd3; border-color: ${OLIVE}AA; }
        .sp-become-btn span { position: relative; z-index: 1; }
      `}</style>

      <section ref={sectionRef} id="sponsors" className="sp-wrap relative overflow-hidden">

        {/* ── MARQUEE ──────────────────────────────────────────────── */}
        <SponsorMarquee />

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

          {/* Eyebrow + Heading */}
          <div className="sp-eyebrow flex items-center gap-3 mb-10">
            <div className="h-px w-6 flex-shrink-0" style={{ background: OLIVE }} />
            <span
              className="sp-cur text-[9px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: ORANGE }}
            >
              Backed By
            </span>
            <div className="h-px flex-1" style={{ background: `${OLIVE}25` }} />
            <span
              className="hidden lg:block text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: `${OLIVE}50` }}
            >
              04 / 04
            </span>
          </div>

          <div className="sp-heading overflow-hidden mb-14 lg:mb-20" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 11vw, 11rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.01em",
          }}>
            {[
              { text: "THE ONES", solid: true },
              { text: "WHO BELIEVE.", solid: false },
            ].map(({ text, solid }) => (
              <div key={text} className="overflow-hidden">
                <div
                  className="sp-word"
                  style={{
                    color: solid ? "#e4ddd3" : "transparent",
                    WebkitTextStroke: solid ? undefined : `clamp(1px,0.18vw,2px) ${OLIVE}99`,
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

            {/* LEFT: Title sponsors */}
            <div className="title-sp-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TITLE_SPONSORS.map((s) => (
                <TitleSponsor key={s.name} {...s} />
              ))}
            </div>

            {/* RIGHT: Co-sponsors + community */}
            <div>
              {/* Co-sponsors */}
              <div className="flex items-center gap-3 mb-1">
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: `${OLIVE}60` }}>
                  Co-Sponsors
                </span>
                <div className="h-px flex-1" style={{ background: `${OLIVE}20` }} />
              </div>
              <div className="co-sp-list">
                {CO_SPONSORS.map((s, i) => (
                  <CoSponsorRow key={s.name} {...s} index={i} />
                ))}
              </div>

              {/* Community partners */}
              <div className="community-block mt-10">
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: `${OLIVE}50` }}>
                    Community Partners
                  </span>
                  <div className="h-px flex-1" style={{ background: `${OLIVE}15` }} />
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {COMMUNITY.map((s) => (
                    <CommunityTag key={s.name} {...s} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM: become a sponsor ──────────────────────────── */}
          <div
            className="sp-cta-block mt-16 lg:mt-24 pt-10"
            style={{ borderTop: `1px solid ${OLIVE}20` }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${OLIVE}55`, marginBottom: 6 }}>
                  Want in?
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(228,221,211,0.4)", lineHeight: 1.3 }}>
                  Partner with India's premier<br />defense hackathon.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <a href="mailto:sponsor@safehackathon.in" className="sp-become-btn">
                  <span>Become a Sponsor</span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {/* small stat */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: ORANGE, lineHeight: 1 }}>500+</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "7px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${OLIVE}60`, marginTop: 2 }}>Eyes on screen</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BORDER ───────────────────────────────────────── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${OLIVE}30, transparent)` }} />

      </section>
    </>
  );
}