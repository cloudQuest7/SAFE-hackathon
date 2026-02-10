"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ShinyText from '@/components/ShinyText'

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'hackathon', label: 'Hackathon', href: '#hackathon' },
  { id: 'problems', label: 'Problems', href: '#problems' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'prizes', label: 'Prizes', href: '#prizes' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'sponsors', label: 'Sponsors', href: '#sponsors' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Observe sections to set active nav item
    const ids = NAV_LINKS.map((l) => l.href).filter((h) => h.startsWith('#')).map((h) => h.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id)
          })
        },
        { root: null, threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (href === '/') return window.scrollTo({ top: 0, behavior: 'smooth' })
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'backdrop-blur-md bg-[rgba(10,15,11,0.55)] border-b border-[rgba(255,255,255,0.04)]' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" onClick={handleNavClick('/')} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#B39C4D,#607744)] shadow-md border border-white/6 flex-shrink-0" />
          <ShinyText text="I-CELL" className="text-white text-lg font-semibold tracking-widest" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={handleNavClick(link.href)}
              className={`relative px-1 py-2 text-sm md:text-base transition-colors ${active === link.id ? 'text-white' : 'text-[#A0A0A0] hover:text-white'}`}
            >
              {link.label}
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#D42D1F] transition-all ${active === link.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transformOrigin: 'left center' }}
              />
            </a>
          ))}

          <a
            href="#register"
            onClick={handleNavClick('#register')}
            className="ml-2 inline-flex items-center gap-2 bg-[#D42D1F] text-black px-4 py-2 rounded-full font-medium shadow-lg border border-[rgba(0,0,0,0.12)] hover:brightness-95 transition"
          >
            Register Now
          </a>
        </div>

        <button
          className="md:hidden p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {!open ? (
            // Hamburger -> styled to feel tactical
            <div className="w-7 h-7 relative">
              <span className="block absolute left-0 right-0 h-0.5 bg-white top-1 rounded transition-transform" />
              <span className="block absolute left-0 right-0 h-0.5 bg-white top-3 rounded transition-opacity" />
              <span className="block absolute left-0 right-0 h-0.5 bg-white top-5 rounded transition-transform" />
            </div>
          ) : (
            // Crosshair / target icon when open
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="6" stroke="#D42D1F" strokeWidth="1.5" />
              <path d="M12 2v2" stroke="#D42D1F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 20v2" stroke="#D42D1F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 12h2" stroke="#D42D1F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20 12h2" stroke="#D42D1F" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] z-40 transform transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="min-h-[calc(100vh-64px)] bg-[rgba(10,15,11,0.9)] backdrop-blur-md px-6 py-10 flex flex-col items-start gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => { handleNavClick(link.href)(e); setOpen(false) }}
              className="text-white text-2xl opacity-0 animate-slide-in"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'forwards' }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#register"
            onClick={(e) => { handleNavClick('#register')(e); setOpen(false) }}
            className="mt-4 inline-flex items-center gap-2 bg-[#D42D1F] text-black px-5 py-3 rounded-full font-semibold shadow"
          >
            Register Now
          </a>
        </div>
      </div>

      <style jsx>{`\n        @keyframes slideIn { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }\n        .animate-slide-in { animation: slideIn 380ms cubic-bezier(.2,.9,.3,1) forwards; }\n      `}</style>
    </header>
  )
}
