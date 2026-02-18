"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Timeline", href: "/timeline" },
  { label: "Tracks", href: "/tracks" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ftr-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400&display=swap');

        .ftr {
          background: #0e0c0a;
          color: #e4ddd3;
          font-family: 'Barlow', sans-serif;
          border-top: 1px solid rgba(228,221,211,0.07);
          position: relative;
          overflow: hidden;
        }

        .ftr-bar {
          height: 2px;
          background: linear-gradient(90deg, #c9581f, rgba(201,88,31,0.15) 75%, transparent);
        }

        /* ── core layout: [title | nav] ── */
        .ftr-main {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          padding: 2.5rem 5vw 0;
          position: relative;
          z-index: 1;
          gap: 2rem;
        }

        /* title */
        .ftr-title {
          line-height: 1;
          overflow: hidden;
        }

        .ftr-word {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 10.5vw, 10.5rem);
          line-height: 0.88;
          transform: translateY(65px);
          opacity: 0;
          transition:
            transform 0.82s cubic-bezier(0.16, 1, 0.3, 1),
            opacity   0.82s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .ftr-word:first-child {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(228,221,211,0.2);
          transition-delay: 0s;
        }

        .ftr-word:last-child {
          color: #e4ddd3;
          transition-delay: 0.1s;
        }

        .ftr-visible .ftr-word {
          transform: translateY(0);
          opacity: 1;
        }

        /* nav */
        .ftr-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-bottom: 0.5rem;
          border-left: 1px solid rgba(228,221,211,0.07);
          padding-left: 2rem;
          min-width: 120px;
        }

        .ftr-nav a {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(228,221,211,0.4);
          text-decoration: none;
          padding: 0.48rem 0;
          width: 100%;
          text-align: right;
          border-bottom: 1px solid rgba(228,221,211,0.05);
          transition: color 0.16s ease;
          position: relative;
        }

        .ftr-nav a:first-child {
          border-top: 1px solid rgba(228,221,211,0.05);
        }

        .ftr-nav a:hover {
          color: #e4ddd3;
        }

        /* ── bottom strip ── */
        .ftr-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1rem 5vw;
          border-top: 1px solid rgba(228,221,211,0.07);
          margin-top: 1.2rem;
          position: relative;
          z-index: 1;
        }

        .ftr-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ftr-org {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(228,221,211,0.28);
        }

        .ftr-copy {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(228,221,211,0.18);
        }

        .ftr-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* icon-only social row */
        .ftr-socials {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ftr-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(228,221,211,0.09);
          border-radius: 3px;
          color: rgba(228,221,211,0.35);
          text-decoration: none;
          transition: color 0.16s, border-color 0.16s, transform 0.16s;
        }

        .ftr-social:hover {
          color: #c9581f;
          border-color: rgba(201,88,31,0.35);
          transform: translateY(-2px);
        }

        .ftr-vline {
          width: 1px;
          height: 16px;
          background: rgba(228,221,211,0.09);
        }

        .ftr-links {
          display: flex;
          gap: 0.9rem;
        }

        .ftr-links a {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.63rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(228,221,211,0.22);
          text-decoration: none;
          transition: color 0.16s;
        }

        .ftr-links a:hover {
          color: rgba(228,221,211,0.6);
        }

        /* mobile */
        @media (max-width: 600px) {
          .ftr-main { grid-template-columns: 1fr; gap: 1.5rem; }
          .ftr-nav {
            align-items: flex-start;
            border-left: none;
            border-top: 1px solid rgba(228,221,211,0.07);
            padding-left: 0;
            padding-top: 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .ftr-nav a { text-align: left; }
          .ftr-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="ftr">
        <div className="ftr-bar" />

        {/* title + nav side by side */}
        <div className="ftr-main">
          <div className="ftr-title" ref={titleRef}>
            <span className="ftr-word">Safe</span>
            <span className="ftr-word">Hackathon</span>
          </div>

          <nav className="ftr-nav" aria-label="Footer navigation">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </div>

        {/* bottom bar */}
        <div className="ftr-bottom">
          <div className="ftr-meta">
            <span className="ftr-org">Innovation Cell · Pillai College of Engineering</span>
            <span className="ftr-copy">
              © {new Date().getFullYear()} Safe Hackathon — All rights reserved
            </span>
          </div>

          <div className="ftr-right">
            <div className="ftr-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr-social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="ftr-vline" />

            <div className="ftr-links">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/code-of-conduct">Conduct</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}