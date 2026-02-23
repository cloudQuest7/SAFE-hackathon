"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  "HARDWARE", "·", "SOFTWARE", "·", "DEFENSE", "·",
  "INNOVATION", "·", "BUILD", "·", "BREAK", "·", "DEPLOY", "·",
];

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

function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="hero-ticker w-full overflow-hidden py-2 my-1">
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

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(".hero-l1 .char", { y: 110, opacity: 0, duration: 1, stagger: 0.05, ease: "expo.out" })
      .from(".hero-ticker", { opacity: 0, duration: 0.4 }, "-=0.5")
      .from(".hero-l2", { x: -80, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=0.55")
      .from(".hero-bottom", { y: 32, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
  }, { scope: sectionRef });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  }, { scope: sectionRef });

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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes ticker-run { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .hero-l1, .hero-l2 { display: flex !important; justify-content: center !important; text-align: center !important; }
        .hero-cta { position: relative; display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(201,88,31,0.5); padding: 12px 28px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #d8e8d0; transition: all 0.3s ease; cursor: pointer; background: none; }
        .hero-cta::before { content: ''; position: absolute; inset: 0; background: #c9581f; transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); z-index: -1; }
        .hero-cta:hover::before { transform: scaleX(1); }
        .hero-cta:hover { border-color: #c9581f; color: #fff; }
        .info-label { font-family: 'Share Tech Mono', monospace; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(58,82,56,0.5); margin-bottom: 0.125rem; }
        .info-value { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #7a9a78; }
      `}</style>

      <section ref={sectionRef} id="hero" className="relative h-dvh w-screen overflow-hidden bg-black flex items-center justify-center px-6">
        <StarsBackground 
          className="absolute inset-0 z-0 pointer-events-none"
          starColor="#9be3ff"
          pointerEvents={false}
          factor={0.08}
          speed={40}
        />

        <div
          ref={contentRef}
          className="absolute inset-0 z-20 flex flex-col"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 mt-4 w-full">
            <div
              className="hero-l1 leading-none overflow-hidden"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 18rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
              }}
            >
              <SplitChars text="SAFE" className="text-[#d8e8d0] drop-shadow-2xl" />
            </div>

            <Ticker />

            <div
              className="hero-l2 leading-none overflow-hidden"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 18rem)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
                color: "transparent",
                WebkitTextStroke: "clamp(1px, 0.15vw, 2px) rgba(74,124,89,0.6)",
              }}
            >
              HACKATHON
            </div>
          </div>

          <div className="hero-bottom px-6 lg:px-12 pb-8 pt-6 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
              <div className="flex gap-8">
                <div>
                  <p className="info-label">Location</p>
                  <p className="info-value">New Panvel, MH</p>
                </div>
                <div>
                  <p className="info-label">Date</p>
                  <p className="info-value">[Date TBA]</p>
                </div>
                <div>
                  <p className="info-label">Duration</p>
                  <p className="info-value">36 Hours</p>
                </div>
              </div>

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
      </section>
    </>
  );
}
