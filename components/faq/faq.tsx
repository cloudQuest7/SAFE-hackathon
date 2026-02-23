"use client";

import { useState, useRef, useEffect } from "react";
import { FAQ_DATA, FAQItem } from "@/constants/faqData"; 

function FAQAnswer({ text, open }: { text: string; open: boolean }) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (inner.current) setH(inner.current.scrollHeight);
  }, [text]);

  return (
    <div
      style={{
        maxHeight: open ? h : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition:
          "max-height 0.52s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
      }}
    >
      <div ref={inner} className="px-4 pt-2 pb-5">
        <p className="text-[#555] text-[13.5px] leading-relaxed font-normal">
          {text}
        </p>
      </div>
    </div>
  );
}

function FAQCell({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      role="button"
      aria-expanded={isOpen}
      className={`
        relative cursor-pointer group
        border-b border-[#d0d0d0]
        transition-colors duration-200
        ${isOpen ? "bg-white" : "hover:bg-[#f0f0f0]"}
      `}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-5">
        <span
          className="text-base font-bold uppercase tracking-[0.06em] leading-tight text-[#111] flex-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
        >
          {item.question}
        </span>

        <div
          className="shrink-0 text-[#111] leading-none"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
            fontWeight: 300,
            fontSize: "22px",
            lineHeight: 1,
          }}
        >
          +
        </div>
      </div>

      <FAQAnswer text={item.answer} open={isOpen} />
    </div>
  );
}

function Marquee() {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < 10; i++) {
    items.push(
      <span
        key={`t-${i}`}
        className="text-[#111] shrink-0"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1rem, 2vw, 2rem)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          marginRight: "0.5rem",
        }}
      >
        YOUR QUESTIONS
      </span>
    );
    items.push(
      <span
        key={`ic-${i}`}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#111] mx-6 text-[#111] shrink-0 self-center"
        style={{ fontSize: "18px", fontWeight: 300 }}
      >
        ?
      </span>
    );
  }

  return (
    <div
      className="overflow-hidden border-y-2 border-[#111] bg-[#e8e8e8] py-3"
      style={{ userSelect: "none" }}
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: "faq-marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

  const col1 = FAQ_DATA.filter((_, i) => i % 3 === 0);
  const col2 = FAQ_DATA.filter((_, i) => i % 3 === 1);
  const col3 = FAQ_DATA.filter((_, i) => i % 3 === 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500&display=swap');

        @keyframes faq-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section id="faq" className="bg-[#e8e8e8] overflow-hidden">

        {/* ── Top asset area — plenty of space for graphics ── */}
        <div className="px-6 lg:px-10 pt-20 pb-10 min-h-[160px] flex flex-col justify-end">
          {/* 
            👆 This space above the heading is intentionally open.
               Drop in your images, illustrations, or any graphic assets here.
               Example: <Image src="/soldier.png" ... />
          */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
            <h2
              className="text-[#111] leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                letterSpacing: "0.03em",
              }}
            >
              Frequently Asked QUESTIONS
            </h2>
            <p
              className="text-[#888] text-[11px] tracking-[0.15em] uppercase pb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {FAQ_DATA.length} questions
            </p>
          </div>
        </div>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── 3-column FAQ grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="border-r-0 lg:border-r border-[#d0d0d0]">
            {col1.map((item) => (
              <FAQCell
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          <div className="border-r-0 lg:border-r border-[#d0d0d0]">
            {col2.map((item) => (
              <FAQCell
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          <div>
            {col3.map((item) => (
              <FAQCell
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom border cap ── */}
        <div className="border-t-2 border-[#111]" />
      </section>
    </>
  );
}