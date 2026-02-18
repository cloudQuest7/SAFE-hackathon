"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function HackathonInfoSection() {
  return (
    <section id="hackathon" className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1E2F23] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide uppercase">
            Mission Parameters
          </h2>
        </motion.div>

        {/* Key Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Duration', value: '48-HOUR OPERATION', icon: '⏱️' },
            { label: 'Team Size', value: '2-4 UNITS', icon: '👥' },
            { label: 'Tracks', value: 'HARDWARE | SOFTWARE', icon: '🛠️' },
            { label: 'Theme', value: 'DEFENCE & TACTICAL', icon: '🎯' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 border-2 border-[#607744] bg-[#607744]/5 backdrop-blur-sm hover:border-[#D42D1F] hover:shadow-lg hover:shadow-[#D42D1F]/30 transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-[#A0A0A0] text-xs font-bold tracking-widest mb-2">{item.label}</p>
              <h3 className="text-white font-black text-xl tracking-wide">{item.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-8 border-2 border-[#607744] bg-[#607744]/5 backdrop-blur-sm rounded-none"
        >
          <p className="text-[#A0A0A0] text-lg leading-relaxed mb-4">
            The I-Cell Defence Hackathon is a 48-hour intensive competition where innovators, engineers, and makers come together to build cutting-edge solutions for defence and tactical challenges.
          </p>
          <p className="text-[#A0A0A0] text-lg leading-relaxed">
            Whether you choose the HARDWARE track or SOFTWARE track, you&apos;ll be pushing boundaries, solving real-world problems, and competing for substantial prizes. This is where innovation meets strategy, and where the best hackers deploy their skills on the field.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
