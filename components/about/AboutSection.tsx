"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const stats = [
    { label: 'PARTICIPANTS', value: '500+' },
    { label: 'EVENTS', value: '50+' },
    { label: 'YEARS', value: '10' },
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1E2F23] px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 border border-[#D42D1F]/50 rounded-full bg-[#D42D1F]/5 backdrop-blur-sm mb-6">
            <p className="text-[#FFB800] text-sm font-semibold tracking-widest">INTELLIGENCE BRIEF</p>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-wide uppercase leading-tight">
            About I-CELL
          </h2>

          <p className="text-[#A0A0A0] text-lg leading-relaxed mb-6">
            The Information and Communications Excellence Lab (I-CELL) drives innovation through cutting-edge technology and strategic thinking. We organize world-class hackathons and tech events that bring together the brightest minds in defence, security, and tactical solutions.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-black text-[#FFB800]">{stat.value}</div>
                <div className="text-xs text-[#A0A0A0] font-bold tracking-widest mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <ul className="space-y-4 mb-8">
            {[
              'Pioneering defence-tech innovation',
              'Building tomorrow\'s tactical solutions',
              'Creating communities of excellence',
            ].map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <span className="text-[#D42D1F] font-bold">■</span>
                <span className="text-[#A0A0A0]">{point}</span>
              </motion.li>
            ))}
          </ul>

          <a href="#register" className="inline-block px-8 py-3 bg-[#D42D1F] text-white font-bold tracking-widest uppercase hover:shadow-lg hover:shadow-[#D42D1F]/50 transition">
            Learn More
          </a>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="w-full max-w-sm aspect-square rounded-lg border-4 border-[#607744] bg-gradient-to-br from-[#607744]/20 to-[#D42D1F]/20 backdrop-blur-md p-8 flex items-center justify-center overflow-hidden relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(45deg, #B39C4D 25%, transparent 25%, transparent 75%, #B39C4D 75%, #B39C4D), linear-gradient(45deg, #B39C4D 25%, transparent 25%, transparent 75%, #B39C4D 75%, #B39C4D)',
                backgroundSize: '60px 60px',
                backgroundPosition: '0 0, 30px 30px',
              }}
            />

            {/* Content */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative z-10 text-center"
            >
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-2">I-CELL</h3>
              <p className="text-[#FFB800] text-sm font-bold tracking-widest">DEFENCE HACKATHON</p>
              <p className="text-[#A0A0A0] text-xs mt-4 max-w-xs">Building the future of tactical innovation through code and creativity</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
