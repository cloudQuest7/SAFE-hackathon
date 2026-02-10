"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TIMELINE_EVENTS = [
  { time: '08:00 - DAY 1', title: 'Registration Opens', icon: '📋', current: false },
  { time: '09:00 - DAY 1', title: 'Opening Ceremony', icon: '🎤', current: false },
  { time: '10:00 - DAY 1', title: 'Hacking Begins', icon: '⚔️', current: true },
  { time: '13:00 - DAY 1', title: 'Lunch Break', icon: '🍽️', current: false },
  { time: '18:00 - DAY 1', title: 'Mentor Checkpoint 1', icon: '👨‍🏫', current: false },
  { time: '09:00 - DAY 2', title: 'Mid-Event Review', icon: '📊', current: false },
  { time: '14:00 - DAY 2', title: 'Submission Deadline', icon: '✅', current: false },
  { time: '16:00 - DAY 2', title: 'Presentations & Awards', icon: '🏆', current: false },
]

export default function TimelineSection() {
  const [tankPosition, setTankPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('timeline')
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      setTankPosition(scrollProgress * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="timeline" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1E2F23] px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide uppercase">
            Battle Plan
          </h2>
          <p className="text-[#A0A0A0] text-lg">
            48-hour tactical operation timeline
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Pixel Art Tank - SVG */}
          <motion.div
            animate={{ left: `${tankPosition}%` }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 -translate-x-1/2 z-10 pointer-events-none"
            style={{ left: `${tankPosition}%` }}
          >
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <rect x="10" y="20" width="40" height="12" fill="#607744" stroke="#34623F" strokeWidth="1" />
              <rect x="18" y="15" width="24" height="8" fill="#768948" stroke="#607744" strokeWidth="1" />
              <circle cx="15" cy="30" r="4" fill="#0A0A0A" stroke="#607744" strokeWidth="1" />
              <circle cx="45" cy="30" r="4" fill="#0A0A0A" stroke="#607744" strokeWidth="1" />
              <rect x="30" y="12" width="6" height="8" fill="#D42D1F" stroke="#768948" strokeWidth="1" />
              <text x="22" y="36" fontSize="8" fill="#FFB800" fontWeight="bold">TANK</text>
            </svg>
          </motion.div>

          {/* Timeline Line */}
          <div className="h-1 bg-[#607744] rounded-full mb-16 relative">
            <motion.div
              animate={{ width: `${tankPosition}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-[#D42D1F] rounded-full"
            />
          </div>

          {/* Timeline Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`relative text-center ${event.current ? 'md:scale-110' : ''}`}
              >
                {/* Event Node */}
                <motion.div
                  animate={{
                    boxShadow: event.current
                      ? '0 0 20px rgba(212,45,31,0.8)'
                      : '0 0 0px rgba(212,45,31,0)',
                  }}
                  className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center border-2 ${
                    event.current
                      ? 'border-[#D42D1F] bg-[#D42D1F]/20'
                      : 'border-[#607744] bg-[#607744]/10'
                  }`}
                >
                  <span className="text-xl">{event.icon}</span>
                </motion.div>

                {/* Event Details */}
                <div className={`p-4 border-2 backdrop-blur-sm ${
                  event.current
                    ? 'border-[#D42D1F] bg-[#D42D1F]/5'
                    : 'border-[#607744] bg-[#607744]/5 hover:border-[#FFB800]'
                } transition`}>
                  <p className={`text-xs font-bold tracking-widest mb-2 ${event.current ? 'text-[#FFB800]' : 'text-[#A0A0A0]'}`}>
                    {event.time}
                  </p>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                    {event.title}
                  </h3>
                  {event.current && (
                    <div className="mt-2 text-[#D42D1F] text-xs font-bold uppercase tracking-widest animate-pulse">
                      CURRENT
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="mt-16 text-center">
            <p className="text-[#FFB800] text-sm font-bold tracking-widest uppercase animate-pulse">
              🔫 Mission in Progress 🔫
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
