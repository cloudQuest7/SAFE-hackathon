"use client"

import React from 'react'
import { motion } from 'framer-motion'

const PRIZES = [
  {
    place: '1st',
    title: 'GOLD OPERATION',
    amount: '₹50,000',
    icon: '🥇',
    color: '#FFB800',
    perks: ['Trophy', 'Internship', 'Swag Pack', 'Certificate']
  },
  {
    place: '2nd',
    title: 'SILVER MISSION',
    amount: '₹30,000',
    icon: '🥈',
    color: '#A0A0A0',
    perks: ['Trophy', 'Swag Pack', 'Certificate']
  },
  {
    place: '3rd',
    title: 'BRONZE DEPLOYMENT',
    amount: '₹20,000',
    icon: '🥉',
    color: '#B39C4D',
    perks: ['Trophy', 'Swag Pack', 'Certificate']
  },
]

const SPECIAL_CATEGORIES = [
  { title: 'Best Hardware Hack', amount: '₹10,000', icon: '⚙️' },
  { title: 'Best Software Solution', amount: '₹10,000', icon: '💻' },
  { title: 'Most Innovative Idea', amount: '₹8,000', icon: '💡' },
  { title: 'Best Beginner Team', amount: '₹5,000', icon: '🚀' },
]

export default function PrizesSection() {
  return (
    <section id="prizes" className="py-24 bg-gradient-to-b from-[#1E2F23] to-[#0A0A0A] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide uppercase">
            Mission Rewards
          </h2>
          <p className="text-[#A0A0A0] text-lg">
            Compete. Build. Win. Claim your throne on the podium.
          </p>
        </motion.div>

        {/* Podium */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* 2nd Place - Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="h-56 w-full border-4 border-[#A0A0A0] bg-[#607744]/10 flex items-end justify-center p-6 mb-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A0A0A0]/20" />
              <motion.div
                animate={{ rotateZ: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl relative z-10"
              >
                {PRIZES[1].icon}
              </motion.div>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
              {PRIZES[1].title}
            </h3>
            <p className="text-3xl font-black text-[#A0A0A0] mb-4">{PRIZES[1].amount}</p>
            <div className="space-y-2">
              {PRIZES[1].perks.map((perk, i) => (
                <p key={i} className="text-[#A0A0A0] text-sm">✓ {perk}</p>
              ))}
            </div>
          </motion.div>

          {/* 1st Place - Center (Tallest) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:row-span-2 md:justify-end"
          >
            <div className="h-80 w-full border-4 border-[#FFB800] bg-[#D42D1F]/20 flex items-end justify-center p-6 mb-4 relative group shadow-lg shadow-[#D42D1F]/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D42D1F]/30" />
              <motion.div
                animate={{ rotateZ: [0, 3, -3, 0], y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl relative z-10"
              >
                {PRIZES[0].icon}
              </motion.div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">
              {PRIZES[0].title}
            </h3>
            <p className="text-4xl font-black text-[#FFB800] mb-4">{PRIZES[0].amount}</p>
            <div className="space-y-2 text-center">
              {PRIZES[0].perks.map((perk, i) => (
                <p key={i} className="text-[#A0A0A0] text-sm">✓ {perk}</p>
              ))}
            </div>
          </motion.div>

          {/* 3rd Place - Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="h-48 w-full border-4 border-[#B39C4D] bg-[#607744]/10 flex items-end justify-center p-6 mb-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B39C4D]/20" />
              <motion.div
                animate={{ rotateZ: [0, -2, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="text-6xl relative z-10"
              >
                {PRIZES[2].icon}
              </motion.div>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
              {PRIZES[2].title}
            </h3>
            <p className="text-3xl font-black text-[#B39C4D] mb-4">{PRIZES[2].amount}</p>
            <div className="space-y-2">
              {PRIZES[2].perks.map((perk, i) => (
                <p key={i} className="text-[#A0A0A0] text-sm">✓ {perk}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Special Categories */}
        <div>
          <h3 className="text-3xl font-black text-white mb-8 text-center uppercase tracking-wide">
            Special Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIAL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border-2 border-[#607744] bg-[#607744]/5 backdrop-blur-sm hover:border-[#FFB800] hover:shadow-lg hover:shadow-[#FFB800]/30 transition text-center"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h4 className="font-bold text-white uppercase tracking-wide mb-2">
                  {cat.title}
                </h4>
                <p className="text-[#FFB800] font-bold text-lg">{cat.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
