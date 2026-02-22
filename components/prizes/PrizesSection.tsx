"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const ORANGE = "#c9581f";
const OLIVE  = "#556b2f";
// OLIVE is used for: rank markers, sub-labels, perks numbering, ghost stroke,
//   inner circle ring, "ON THE BOARD." outline, eyebrow line, corner-box borders

// ─── MAGNETIC BUTTON ─────────────────────────────────────────────────────────
function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top  - r.height / 2) * 0.35,
      duration: 0.5, ease: "power2.out",
    });
  };
  const onLeave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

// ─── SCRAMBLE TEXT ───────────────────────────────────────────────────────────
function Scramble({ text, trigger }: { text: string; trigger: boolean }) {
  const [out, setOut] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₹#@!%";
  useEffect(() => {
    if (!trigger) { setOut(text); return; }
    let iter = 0;
    const id = setInterval(() => {
      setOut(text.split("").map((ch, i) =>
        i < iter ? ch : ch === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      iter += 0.6;
      if (iter > text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [trigger, text]);
  return <>{out}</>;
}

// ─── TICKER ──────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ["₹1,00,000","·","FIRST PLACE","·","₹50,000","·","RUNNER UP","·","₹25,000","·","SPECIAL PRIZES","·","₹2,10,000+ POOL","·"];

function Ticker({ dark }: { dark?: boolean }) {
  const rep = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className={`overflow-hidden py-3 ${dark ? "bg-[#c9581f]" : "bg-[#0a0908] border-y border-white/[0.06]"}`}
      style={{ userSelect: "none" }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: "p-ticker 24s linear infinite", width: "max-content" }}>
        {rep.map((t, i) => (
          <span
            key={i}
            className="shrink-0 mx-5 text-[10px] tracking-[0.25em] font-bold"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              // top dark ticker: olive dots, dim cream text
              // bottom orange ticker: white/30 dots, white text
              color: t === "·"
                ? (dark ? "rgba(255,255,255,0.35)" : OLIVE)
                : (dark ? "rgba(255,255,255,0.9)" : "rgba(228,221,211,0.45)"),
            }}
          >{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── PRIZE ROW ───────────────────────────────────────────────────────────────
function PrizeRow({
  rank, amount, label, sub,
}: { rank: string; amount: string; label: string; sub: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="prize-row relative flex items-center justify-between py-6 cursor-default overflow-hidden"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Hover flood fill */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(105deg, ${ORANGE} 60%, #8b3a12)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div className="relative z-10 flex items-center gap-5 lg:gap-10">
        {/* RANK — olive when idle, white when hovered */}
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px", letterSpacing: "0.35em",
          color: hov ? "rgba(255,255,255,0.55)" : OLIVE,
          transition: "color 0.3s",
          minWidth: "2ch",
        }}>{rank}</span>

        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "13px", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: hov ? "#fff" : "rgba(228,221,211,0.75)",
            transition: "color 0.3s",
          }}>{label}</div>

          {/* Sub-label — olive-tinted when idle */}
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: hov ? "rgba(255,255,255,0.45)" : `${OLIVE}99`,
            transition: "color 0.3s",
          }}>{sub}</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
          color: hov ? "#fff" : ORANGE,
          transition: "color 0.3s",
          letterSpacing: "0.02em", lineHeight: 1,
        }}>
          <Scramble text={amount} trigger={hov} />
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{
          opacity: hov ? 1 : 0,
          transform: hov ? "translateX(0)" : "translateX(-8px)",
          transition: "all 0.3s ease",
        }}>
          <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function PrizesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ghostRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ghost parallax — horizontal drift
    gsap.to(ghostRef.current, {
      xPercent: -10, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
    });

    // Heading lines
    gsap.from(".ph-line", {
      yPercent: 110, duration: 1.1, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: ".prize-heading", start: "top 82%", once: true },
    });

    // Prize rows
    gsap.from(".prize-row", {
      x: -50, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: ".prize-rows", start: "top 85%", once: true },
    });

    // Right panel
    gsap.from(".right-panel > *", {
      y: 36, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: ".right-panel", start: "top 80%", once: true },
    });

    // Pool counter
    const el = document.querySelector<HTMLElement>(".pool-num");
    if (el) {
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter() {
          gsap.fromTo({ v: 0 }, { v: 210000 }, {
            duration: 2, ease: "power2.out",
            onUpdate() {
              el.textContent = "₹" + Math.round((this.targets()[0] as any).v).toLocaleString("en-IN");
            },
          });
        },
      });
    }

    // Special tags
    gsap.from(".s-tag", {
      scale: 0.75, opacity: 0, duration: 0.45, stagger: 0.06, ease: "back.out(1.5)",
      scrollTrigger: { trigger: ".s-tags", start: "top 88%", once: true },
    });

    // Bottom heading
    gsap.from(".bottom-ph", {
      yPercent: 110, duration: 1, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: ".bottom-heading", start: "top 85%", once: true },
    });

    // Floating elements
    gsap.to(".float-badge-1", { y: -14, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".float-badge-2", { y: -10, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Share+Tech+Mono&display=swap');

        @keyframes p-ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .prizes-wrap { background: #0a0908; }

        /* Ghost text — olive stroke gives it a camo/field-manual texture */
        .ghost-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(10rem, 26vw, 28rem);
          line-height: 0.82;
          color: transparent;
          -webkit-text-stroke: 1px ${OLIVE}22;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.02em;
        }

        /* Eyebrow cursor */
        .cur-blink::after { content:'_'; animation: cur-blink 1s step-end infinite; color:${ORANGE}; }

        /* Corner box — olive-tinted border */
        .corner-box {
          position: relative;
          border: 1px solid ${OLIVE}28;
        }
        .corner-box::before, .corner-box::after {
          content:''; position:absolute;
          width:12px; height:12px;
          border-color:${OLIVE}55; border-style:solid;
        }
        .corner-box::before { top:-1px; left:-1px;   border-width:2px 0 0 2px; }
        .corner-box::after  { bottom:-1px; right:-1px; border-width:0 2px 2px 0; }

        /* Special tag */
        .s-tag {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(255,255,255,0.08);
          padding:9px 16px; white-space:nowrap; cursor:default;
          transition: border-color .22s, background .22s;
        }
        /* alternate odd=orange, even=olive on hover */
        .s-tag:nth-child(odd):hover  { border-color:${ORANGE}; background:${ORANGE}10; }
        .s-tag:nth-child(even):hover { border-color:${OLIVE};  background:${OLIVE}18; }

        .s-tag .s-label {
          font-family:'Barlow Condensed',sans-serif; font-size:11px;
          font-weight:700; letter-spacing:0.15em; text-transform:uppercase;
          color:rgba(255,255,255,0.45); transition:color .22s;
        }
        .s-tag:hover .s-label { color:#fff; }
        .s-tag .s-amt {
          font-family:'Bebas Neue',sans-serif; font-size:1.1rem;
          letter-spacing:0.05em; color:${ORANGE};
        }
        /* Even tags: amount in olive */
        .s-tag:nth-child(even) .s-amt { color:${OLIVE}; filter:brightness(1.4); }

        /* CTA button */
        .prize-reg-btn {
          position:relative; overflow:hidden;
          display:inline-flex; align-items:center; gap:14px;
          background:${ORANGE}; color:#fff; border:none;
          padding:18px 44px;
          font-family:'Bebas Neue',sans-serif;
          font-size:1.5rem; letter-spacing:0.1em; cursor:pointer;
          clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
        }
        .prize-reg-btn::after {
          content:''; position:absolute; inset:0;
          background:#fff; transform:translateY(105%);
          transition:transform .42s cubic-bezier(0.16,1,0.3,1);
        }
        .prize-reg-btn:hover::after { transform:translateY(0); }
        .prize-reg-btn:hover { color:${ORANGE}; }
        .prize-reg-btn > * { position:relative; z-index:1; }

        .spin-svg { animation:spin-slow 14s linear infinite; }
      `}</style>

      <section ref={sectionRef} id="prizes" className="prizes-wrap relative overflow-hidden">

        {/* ── TOP TICKER ─────────────────────────────────────────── */}
        <Ticker />

        {/* ── HERO BLOCK ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden min-h-[50vh] flex items-center">
          {/* Ghost bg — olive-stroked camo feel */}
          <div ref={ghostRef} className="ghost-text absolute top-[-10%] left-[-3%]" aria-hidden>
            PRIZES PRIZES
          </div>

          <div className="relative z-10 w-full px-6 lg:px-12 max-w-screen-2xl mx-auto py-16 lg:py-24">
            {/* Eyebrow — olive accent line, orange text */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-6 flex-shrink-0" style={{ background: OLIVE }} />
              <span
                className="cur-blink text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: ORANGE }}
              >
                Combat Rewards
              </span>
              <div className="hidden lg:block h-px flex-1" style={{ background: `${OLIVE}30` }} />
              <span
                className="hidden lg:block text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: `${OLIVE}60` }}
              >
                03 / 04
              </span>
            </div>

            {/* BIG HEADING */}
            <div
              className="prize-heading"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 14vw, 14rem)",
                lineHeight: 0.83,
                letterSpacing: "-0.01em",
              }}
            >
              {/* WIN. — cream solid */}
              <div className="overflow-hidden">
                <div className="ph-line" style={{ color: "#e4ddd3" }}>WIN.</div>
              </div>
              {/* EARN. — orange outline */}
              <div className="overflow-hidden">
                <div className="ph-line" style={{
                  color: "transparent",
                  WebkitTextStroke: `clamp(1px,0.18vw,2.5px) ${ORANGE}BB`,
                }}>EARN.</div>
              </div>
              {/* DEPLOY. — olive outline — the money line gets the status colour */}
              <div className="overflow-hidden">
                <div className="ph-line" style={{
                  color: "transparent",
                  WebkitTextStroke: `clamp(1px,0.18vw,2.5px) ${OLIVE}CC`,
                }}>DEPLOY.</div>
              </div>
            </div>
          </div>

          {/* Floating spinning badge — olive ring */}
          <div className="float-badge-1 absolute top-8 right-8 lg:top-16 lg:right-16 z-20 pointer-events-none">
            <div style={{ position: "relative", width: 90, height: 90 }}>
              <svg className="spin-svg" viewBox="0 0 90 90" width="90" height="90" style={{ position: "absolute", inset: 0 }}>
                <path id="cr" d="M45,45 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" fill="none" />
                <text style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize:"7.5px", letterSpacing:"0.14em", fill:`${OLIVE}AA`, fontWeight:700 }}>
                  <textPath href="#cr">SAFE HACKATHON · 36 HRS · PCE ·</textPath>
                </text>
              </svg>
              <div style={{
                position:"absolute", inset:"18px",
                border:`1px solid ${OLIVE}45`, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:OLIVE, filter:"brightness(1.5)", lineHeight:1 }}>36h</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ──────────────────────────────────── */}
        <div className="relative z-10 px-6 lg:px-12 max-w-screen-2xl mx-auto pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">

            {/* LEFT: Prize rows */}
            <div className="prize-rows">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-[8px] tracking-[0.3em] uppercase"
                  style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}80` }}
                >
                  Main Prizes
                </span>
                <div className="h-px flex-1" style={{ background:`${OLIVE}25` }} />
              </div>

              <PrizeRow
                rank="01"
                label="Grand Prize · First Strike"
                sub="Trophy + Mentorship + Internship fast-track"
                amount="₹1,00,000"
              />
              <PrizeRow
                rank="02"
                label="Runner Up · Second Wave"
                sub="Trophy + Industry Connect + Certificate"
                amount="₹50,000"
              />
              <PrizeRow
                rank="03"
                label="2nd Runner Up · Third Force"
                sub="Trophy + Certificate of Merit"
                amount="₹25,000"
              />

              <p
                className="mt-6 text-[12px] leading-relaxed"
                style={{ fontFamily:"'Barlow',sans-serif", color:"rgba(255,255,255,0.22)", maxWidth:"520px" }}
              >
                All top-3 teams receive trophies, certificates, industry connections, and fast-track opportunities with our defense partners.
              </p>
            </div>

            {/* RIGHT: Pool circle + perks */}
            <div className="right-panel flex flex-col gap-7 pt-0 lg:pt-10">

              {/* Pool circle — olive dashed ring + inner olive ring */}
              <div className="flex justify-start">
                <div style={{ position:"relative" }}>
                  {/* outer dashed spin: orange */}
                  <svg className="spin-svg absolute inset-0" viewBox="0 0 180 180" width="180" height="180">
                    <circle cx="90" cy="90" r="86" fill="none"
                      stroke={`${ORANGE}18`} strokeWidth="1" strokeDasharray="4 8" />
                  </svg>
                  {/* middle static: olive */}
                  <svg className="absolute inset-0" viewBox="0 0 180 180" width="180" height="180" style={{ transform:"rotate(180deg)" }}>
                    <circle cx="90" cy="90" r="76" fill="none"
                      stroke={`${OLIVE}35`} strokeWidth="1" strokeDasharray="2 12" />
                  </svg>
                  <div style={{
                    width:180, height:180, borderRadius:"50%",
                    border:`1px solid ${OLIVE}40`,
                    display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"center",
                    position:"relative",
                  }}>
                    <span
                      className="text-[7px] tracking-[0.35em] uppercase mb-1"
                      style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}80` }}
                    >Total Pool</span>
                    <span
                      className="pool-num"
                      style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", color:ORANGE, letterSpacing:"0.03em", lineHeight:1.1 }}
                    >₹0</span>
                    <span
                      className="text-[7px] tracking-[0.2em] uppercase mt-1"
                      style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}55` }}
                    >& growing</span>
                  </div>
                </div>
              </div>

              {/* Perks — olive corner box, olive numbering */}
              <div className="corner-box p-6 space-y-3">
                <p
                  className="text-[8px] tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}70` }}
                >
                  Beyond Cash ↓
                </p>
                {[
                  "Industry Mentorship",
                  "Internship Fast-track",
                  "Defense Partner Connect",
                  "Media Feature + PR",
                  "Trophy + Certificates",
                ].map((perk, i) => (
                  <div key={perk} className="flex items-center gap-3 group cursor-default">
                    {/* Numbers in olive — like a military checklist */}
                    <span
                      className="transition-colors text-[9px]"
                      style={{
                        fontFamily:"'Share Tech Mono',monospace",
                        color:`${OLIVE}70`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="transition-colors text-[11px] tracking-[0.08em] uppercase font-semibold group-hover:text-white/80"
                      style={{ fontFamily:"'Barlow Condensed',sans-serif", color:"rgba(255,255,255,0.4)" }}
                    >
                      {perk}
                    </span>
                    {/* small olive dot */}
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:OLIVE, fontSize:"6px" }}>◆</span>
                  </div>
                ))}
              </div>

              {/* Floating "36h" tile */}
              <div className="float-badge-2 self-start corner-box p-4 text-center" style={{ minWidth:90 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:ORANGE, lineHeight:1 }}>36</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"7px", letterSpacing:"0.25em", color:`${OLIVE}80`, textTransform:"uppercase", marginTop:2 }}>
                  Hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SPECIAL PRIZES ─────────────────────────────────────── */}
        <div className="relative z-10">
          <div className="px-6 lg:px-12 max-w-screen-2xl mx-auto mb-4">
            <div className="flex items-center gap-3">
              {/* olive short line */}
              <div className="h-px w-5 flex-shrink-0" style={{ background:OLIVE }} />
              <span
                className="text-[8px] tracking-[0.3em] uppercase"
                style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}70` }}
              >
                Special Category Awards
              </span>
              <div className="h-px flex-1" style={{ background:`${OLIVE}20` }} />
            </div>
          </div>

          <div className="s-tags overflow-x-auto px-6 lg:px-12 pb-4" style={{ scrollbarWidth:"none" }}>
            <div className="flex gap-3 w-max">
              {[
                { icon:"⚙", label:"Best Hardware Hack",  amt:"₹10K" },
                { icon:"◈", label:"Best UI/UX Design",   amt:"₹10K" },
                { icon:"◉", label:"Most Innovative",      amt:"₹10K" },
                { icon:"★", label:"Best First-Timers",   amt:"₹5K"  },
                { icon:"⬡", label:"Best Defense Track",  amt:"₹10K" },
                { icon:"↯", label:"Fastest Deploy",      amt:"₹5K"  },
              ].map((s, i) => (
                <div key={s.label} className="s-tag">
                  {/* odd = orange icon, even = olive icon */}
                  <span style={{ color: i % 2 === 0 ? `${ORANGE}AA` : `${OLIVE}CC`, fontSize:"1rem" }}>
                    {s.icon}
                  </span>
                  <span className="s-label">{s.label}</span>
                  <span className="s-amt">{s.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORANGE TICKER ──────────────────────────────────────── */}
        <div className="mt-10 lg:mt-14">
          <Ticker dark />
        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
        <div className="relative z-10 px-6 lg:px-12 max-w-screen-2xl mx-auto py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">

            <div>
              <p
                className="text-[8px] tracking-[0.4em] uppercase mb-3"
                style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}55` }}
              >
                What are you waiting for?
              </p>
              <div
                className="bottom-heading"
                style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(3rem, 9vw, 9rem)",
                  lineHeight:0.83,
                  letterSpacing:"-0.01em",
                }}
              >
                {/* YOUR NAME — solid cream */}
                <div className="overflow-hidden">
                  <div className="bottom-ph" style={{ color:"#e4ddd3" }}>YOUR NAME</div>
                </div>
                {/* ON THE BOARD. — olive outline, not orange — intentional contrast */}
                <div className="overflow-hidden">
                  <div className="bottom-ph" style={{
                    color:"transparent",
                    WebkitTextStroke:`clamp(1px,0.15vw,2.5px) ${OLIVE}BB`,
                  }}>ON THE BOARD.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              <MagneticBtn>
                <button className="prize-reg-btn">
                  <span>Register Now</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </MagneticBtn>
              <span
                className="text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily:"'Share Tech Mono',monospace", color:`${OLIVE}55` }}
              >
                Free · Teams of 2–5 · 36hrs
              </span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}