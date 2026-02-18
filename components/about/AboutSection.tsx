"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Stat data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: 500, suffix: "+", label: "Participants" },
  { value: 36, suffix: " hrs", label: "Non-Stop" },
  { value: 6, suffix: "", label: "Tracks" },
  { value: 100, suffix: "%", label: "Free Entry" },
];

const TAGS = ["HARDWARE", "SOFTWARE", "DEFENSE", "36 HRS", "OPEN TO ALL", "PCE"];

// ── Line reveal wrapper ───────────────────────────────────────────────────────
function LineReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="line-inner">{children}</div>
    </div>
  );
}

// ── Main About ────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ghostNumRef = useRef<HTMLDivElement>(null);

  // ── Clip-path reveal as section enters (wipe from bottom)
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Section wipes open via ScrollTrigger
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "inset(8% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 1.2,
          },
        }
      );

      // Ghost "01" number parallax drift
      gsap.to(ghostNumRef.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Heading lines — clip reveal staggered
      gsap.from(".about-line-inner", {
        yPercent: 105,
        duration: 1.1,
        stagger: 0.13,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Stats count up
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              el.innerText = Math.round(parseFloat(el.innerText)).toString();
            },
          }
        );
      });

      // Right column stagger slide-in
      gsap.from(".about-right-item", {
        x: 50,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-right",
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // Tags pop in
      gsap.from(".about-tag", {
        scale: 0.75,
        opacity: 0,
        duration: 0.45,
        stagger: 0.065,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".about-tags",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Stat border lines draw in
      gsap.from(".stat-border", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".stat-grid",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <>
      <style>{`
        @keyframes about-cta-line {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        .about-cta-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .about-cta-secondary::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 1px;
          background: #111;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .about-cta-secondary:hover::after { transform: scaleX(1); }

        .about-primary-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #c9581f;
          color: #fff;
          border: none;
          padding: 13px 32px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s;
        }
        .about-primary-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #a34016;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .about-primary-btn:hover::before { transform: scaleX(1); }
        .about-primary-btn span { position: relative; z-index: 1; }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
        }
      `}</style>

      {/* ── Transition seam — orange sweep line ── */}
      <div className="relative z-30 w-full overflow-hidden">
        <div
          className="transition-rule h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #c9581f 30%, #c9581f 70%, transparent)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
          <span
            className="bg-[#e8e8e8] px-4 -translate-y-1/2 text-[8px] tracking-[0.3em] text-[#999] uppercase"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            Mission Brief
          </span>
        </div>
      </div>

      {/* ── About section ── */}
      <section
        id="about"
        ref={sectionRef}
        className="relative bg-[#e8e8e8] overflow-hidden"
        style={{ clipPath: "inset(8% 0 0 0)" }}
      >
        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 z-0" />

        {/* Section counter */}
        <div className="absolute top-8 right-6 lg:right-12 z-10">
          <span
            className="text-[#999] text-[9px] tracking-[0.2em]"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            02 / 04
          </span>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">

          {/* ── Section label strip ── */}
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px w-8 bg-[#c9581f]" />
            <span
              className="text-[#c9581f] text-[9px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              Mission Brief
            </span>
            <div className="h-px flex-1 bg-[#ccc]" />
            <span
              className="text-[#aaa] text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              About the Hackathon
            </span>
          </div>

          {/* ── Main two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">

            {/* LEFT COL */}
            <div className="relative">

              {/* Ghost "01" number */}
              <div
                ref={ghostNumRef}
                className="absolute -top-8 -left-4 select-none pointer-events-none will-change-transform"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(10rem, 28vw, 28rem)",
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,0,0,0.06)",
                  zIndex: 0,
                }}
              >
                01
              </div>

              {/* Heading */}
              <div className="about-heading relative z-10 mb-10">
                {["WHERE ENGINEERS", "BECOME", "SOLDIERS."].map((line, i) => (
                  <LineReveal key={i}>
                    <div
                      className="about-line-inner leading-none"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 7vw, 7.5rem)",
                        letterSpacing: "0.02em",
                        color: i === 1 ? "transparent" : "#111",
                        WebkitTextStroke: i === 1 ? "1.5px #111" : undefined,
                        lineHeight: 0.9,
                      }}
                    >
                      {line}
                    </div>
                  </LineReveal>
                ))}
              </div>

              {/* Stat grid */}
              <div className="stat-grid relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-0">
                {STATS.map((s, i) => (
                  <div key={i} className="pr-4 sm:pr-6">
                    <div
                      className="stat-border mb-2 h-px bg-[#bbb]"
                      style={{ transformOrigin: "left center" }}
                    />
                    <div
                      className="flex items-end gap-0.5 mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                        lineHeight: 1,
                        color: "#111",
                      }}
                    >
                      <span
                        className="stat-num"
                        data-target={s.value}
                      >
                        {s.value}
                      </span>
                      <span className="text-[#c9581f] text-[0.6em] pb-0.5">{s.suffix}</span>
                    </div>
                    <p
                      className="text-[#888] text-[9px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COL */}
            <div className="about-right flex flex-col gap-6 lg:pt-10">

              {/* Orange label */}
              <div className="about-right-item flex items-center gap-2">
                <div className="w-3 h-px bg-[#c9581f]" />
                <span
                  className="text-[#c9581f] text-[9px] tracking-[0.28em] uppercase"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  // About the Event
                </span>
              </div>

              {/* Body paragraph 1 */}
              <p
                className="about-right-item text-[#333] text-[14px] leading-[1.8] font-normal"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Safe Hackathon is a flagship innovation challenge organized by{" "}
                <span className="font-semibold text-[#111]">Innovation Cell PCE</span> — bringing
                together India's brightest minds to engineer real-world solutions for the{" "}
                <span className="font-semibold text-[#111]">Armed Forces</span>.
              </p>

              {/* Body paragraph 2 */}
              <p
                className="about-right-item text-[#666] text-[13px] leading-[1.8]"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                From hardware prototypes to software systems, teams of 2–5 compete across
                multiple defense tracks — judged by defense experts, industry leaders, and
                academic veterans over an intense 36-hour sprint.
              </p>

              {/* Tags */}
              <div className="about-tags about-right-item flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="about-tag inline-block border border-[#bbb] hover:border-[#c9581f] hover:text-[#c9581f] px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase text-[#777] transition-colors duration-200"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA pair */}
              <div className="about-right-item flex items-center gap-6 pt-2">
                <button className="about-primary-btn">
                  <span>Register Now</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="#tracks"
                  className="about-cta-secondary text-[#333] hover:text-[#111] text-[11px] tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                >
                  View Tracks
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-1">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Decorative corner */}
              <div className="about-right-item mt-4 flex items-center gap-3 opacity-40">
                <div className="h-px flex-1 bg-[#ccc]" />
                <span
                  className="text-[8px] tracking-[0.2em] text-[#aaa]"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  PILLAI COLLEGE OF ENGINEERING
                </span>
                <div className="h-px w-4 bg-[#ccc]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom edge accent ── */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9581f]/30 to-transparent" />
      </section>
    </>
  );
}