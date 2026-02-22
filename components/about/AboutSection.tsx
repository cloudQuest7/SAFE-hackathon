"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: "+", label: "Participants" },
  { value: 36, suffix: "hrs", label: "Non-Stop" },
  { value: 6, suffix: "", label: "Tracks" },
  { value: 100, suffix: "%", label: "Free Entry" },
];

const TAGS = ["HARDWARE", "SOFTWARE", "DEFENSE", "36 HRS", "OPEN TO ALL", "PCE"];

function LineReveal({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden line-reveal"><div className="line-inner">{children}</div></div>;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ghostNumRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ScrollTrigger.normalizeScroll(true);

    gsap.set([sectionRef.current, ".line-inner", ".stat-num"], { willChange: "transform" });
    

    gsap.to(ghostNumRef.current!, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    const headings = gsap.utils.toArray(".about-heading .line-inner");
    gsap.from(headings, {
      yPercent: 100,
      duration: 1,
      stagger: 0.12,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top 80%",
        once: true,
      }
    });

    gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el, i) => {
      const target = parseFloat(el.dataset.target ?? "0");
      gsap.fromTo(el, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => { el.textContent = Math.round(parseFloat(el.textContent as string)).toString(); }
        }
      );
    });

    gsap.from(".about-right-item", {
      x: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-right",
        start: "top 80%",
        once: true,
      }
    });

    gsap.from(".about-tag", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about-tags",
        start: "top 90%",
        once: true,
      }
    });

    gsap.from(".stat-border", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".stat-grid",
        start: "top 85%",
        once: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Share+Tech+Mono&display=swap');
        
        * { box-sizing: border-box; }
        
        .about-primary-btn {
          --btn-w: 200px;
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          background: #c9581f; color: #fff; border: none;
          padding: 13px 32px; font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; cursor: pointer;
          min-width: var(--btn-w); contain: layout style;
          transition: none;
        }
        .about-primary-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #a34016; transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .about-primary-btn:hover::before { transform: scaleX(1); }
        .about-primary-btn span { position: relative; z-index: 1; }

        .about-cta-secondary {
          position: relative; display: inline-flex; align-items: center; gap: 6px;
          color: #333; font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; text-decoration: none;
          transition: color 0.3s ease;
        }
        .about-cta-secondary::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px; background: #111; transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .about-cta-secondary:hover { color: #111; }
        .about-cta-secondary:hover::after { transform: scaleX(1); }

        .stat-num {
          font-variant-numeric: tabular-nums; font-family: 'Bebas Neue', sans-serif;
          display: inline-block; min-width: 2ch; contain: layout;
        }
        .about-ghost-container { 
          min-height: 1px; contain: layout paint; 
          position: relative; height: 0.1px;
        }

        .line-reveal { contain: layout paint; height: 100%; }
        .line-inner { contain: layout paint; }

        .noise-overlay {
          position: fixed; inset: 0; z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025; pointer-events: none; will-change: transform;
        }

        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .font-barlow { font-family: 'Barlow', sans-serif; }
        .font-barlow-condensed { font-family: 'Barlow Condensed', sans-serif; }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative bg-[#e8e8e8] overflow-hidden py-16 lg:py-24 px-4 lg:px-12"
      >
        <div className="noise-overlay" />

        <div className="absolute top-8 right-6 lg:right-12 z-20 text-[9px] tracking-[0.2em] text-[#999] font-mono">
          02 / 04
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <div className="h-px w-8 bg-[#c9581f] flex-shrink-0" />
            <span className="text-[#c9581f] text-[9px] tracking-[0.35em] uppercase font-mono">
              Mission Brief
            </span>
            <div className="h-px flex-1 bg-[#ccc]" />
            <span className="text-[#aaa] text-[9px] tracking-[0.2em] uppercase font-mono hidden lg:inline">
              About the Hackathon
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-start">
            <div className="relative">
              <div 
                ref={ghostNumRef}
                className="about-ghost-container absolute -top-8 -left-4 select-none pointer-events-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(10rem, 28vw, 28rem)",
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,0,0,0.06)",
                }}
              >
                01
              </div>

              <div className="about-heading mb-8 lg:mb-10 space-y-1">
                {["WHERE ENGINEERS", "BECOME", "SOLDIERS."].map((line, i) => (
                  <LineReveal key={i}>
                    <div
                      className="line-inner leading-none"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 7vw, 7.5rem)",
                        letterSpacing: "0.02em",
                        lineHeight: 0.9,
                        color: i === 1 ? "transparent" : "#111",
                        WebkitTextStroke: i === 1 ? "1.5px #111" : undefined,
                      }}
                    >
                      {line}
                    </div>
                  </LineReveal>
                ))}
              </div>

              <div className="stat-grid grid grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-0">
                {STATS.map((s, i) => (
                  <div key={i} className="pr-2 lg:pr-6 space-y-1">
                    <div className="stat-border h-px bg-[#bbb] w-full" />
                    <div className="flex items-baseline gap-0.5" style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                      lineHeight: 1,
                      color: "#111",
                    }}>
                      <span className="stat-num" data-target={s.value}>{s.value}</span>
                      <span className="text-[#c9581f] text-[0.6em]">{s.suffix}</span>
                    </div>
                    <p className="text-[#888] text-[9px] tracking-[0.2em] uppercase font-mono">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-right flex flex-col gap-6 pt-4 lg:pt-10 lg:pl-8">
              <div className="about-right-item flex items-center gap-2">
                <div className="w-3 h-px bg-[#c9581f]" />
              </div>

              <p className="about-right-item text-[#333] text-[14px] leading-[1.8] font-normal font-barlow">
                Safe Hackathon is a flagship innovation challenge organized by{" "}
                <span className="font-semibold text-[#111]">Innovation Cell PCE</span> — bringing
                Indias brightest minds to engineer real-world solutions for the{" "}
                <span className="font-semibold text-[#111]">Armed Forces</span>.
              </p>

              <p className="about-right-item text-[#666] text-[13px] leading-[1.8] font-barlow">
                From hardware prototypes to software systems, teams of 2–5 compete across
                multiple defense tracks — judged by defense experts, industry leaders, and
                academic veterans over an intense 36-hour sprint.
              </p>

              <div className="about-tags flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="about-tag inline-block border border-[#bbb] hover:border-[#c9581f] hover:text-[#c9581f] px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase text-[#777] transition-all duration-200 font-barlow-condensed font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="about-right-item flex items-center gap-6 pt-2">
                <button className="about-primary-btn">
                  <span>Register Now</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a href="#tracks" className="about-cta-secondary">
                  View Tracks
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="about-right-item mt-4 flex items-center gap-3 opacity-40">
                <div className="h-px flex-1 bg-[#ccc]" />
                <span className="text-[8px] tracking-[0.2em] text-[#aaa] font-mono">
                  PILLAI COLLEGE OF ENGINEERING
                </span>
                <div className="h-px w-4 bg-[#ccc]" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9581f]/30 to-transparent" />
      </section>
    </>
  );
}
