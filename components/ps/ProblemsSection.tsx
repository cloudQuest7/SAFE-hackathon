"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PROBLEMS = {
  HARDWARE: [
    {
      id: 1,
      title: 'Autonomous Surveillance Drone',
      difficulty: 'HARD',
      description: 'Design a lightweight drone with autonomous patrol and threat detection capabilities.',
      details: 'Build a prototype that can autonomously patrol an area, detect intrusions, and report back to base.'
    },
    {
      id: 2,
      title: 'Secure Communication Device',
      difficulty: 'MEDIUM',
      description: 'Create an encrypted handheld device for tactical field communications.',
      details: 'Implement military-grade encryption and low-latency transmission for field teams.'
    },
    {
      id: 3,
      title: 'Field Sensor Network',
      difficulty: 'EASY',
      description: 'Build an IoT network of sensors for perimeter monitoring.',
      details: 'Create a mesh network of environmental sensors with data aggregation.'
    },
  ],
  SOFTWARE: [
    {
      id: 1,
      title: 'Threat Detection AI',
      difficulty: 'HARD',
      description: 'Develop machine learning models for real-time threat classification.',
      details: 'Train models on threat data to identify and classify security incidents in real-time.'
    },
    {
      id: 2,
      title: 'Encrypted Messaging App',
      difficulty: 'MEDIUM',
      description: 'Build a secure messaging platform with end-to-end encryption.',
      details: 'Implement RSA/AES encryption, secure key exchange, and message authentication.'
    },
    {
      id: 3,
      title: 'Resource Allocation Optimizer',
      difficulty: 'EASY',
      description: 'Algorithm to optimize defence resource distribution.',
      details: 'Create an optimization engine for efficient deployment of resources across regions.'
    },
  ],
}

const difficultyColors = {
  EASY: { bg: '#34623F', border: '#34623F', text: '#F5F5F5' },
  MEDIUM: { bg: '#FFB800', border: '#FFB800', text: '#0A0A0A' },
  HARD: { bg: '#D42D1F', border: '#D42D1F', text: '#F5F5F5' },
}

export default function ProblemStatementsSection() {
  const [track, setTrack] = useState<'HARDWARE' | 'SOFTWARE'>('HARDWARE')
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="problems" className="py-24 bg-gradient-to-b from-[#1E2F23] to-[#0A0A0A] px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide uppercase">
            Tactical Objectives
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Choose your battlefield: HARDWARE or SOFTWARE. Each track presents unique challenges to solve.
          </p>
        </motion.div>

        {/* Tab Switch */}
        <div className="flex justify-center gap-4 mb-12">
          {['HARDWARE', 'SOFTWARE'].map((t) => (
            <button
              key={t}
              onClick={() => { setTrack(t as 'HARDWARE' | 'SOFTWARE'); setExpanded(null) }}
              className={`px-8 py-3 font-bold tracking-widest uppercase transition ${
                track === t
                  ? 'bg-[#D42D1F] text-white border-2 border-[#D42D1F]'
                  : 'border-2 border-[#607744] text-[#A0A0A0] hover:border-[#FFB800]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Problem Cards */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROBLEMS[track].map((problem, idx) => (
            <motion.div
              key={problem.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="p-6 border-2 border-[#607744] bg-[#607744]/5 backdrop-blur-sm cursor-pointer hover:border-[#D42D1F] transition group"
                onClick={() => setExpanded(expanded === problem.id ? null : problem.id)}
              >
                {/* CLASSIFIED stamp */}
                <div className="absolute top-4 right-4 text-xs font-bold tracking-widest text-[#D42D1F] opacity-40 rotate-12">
                  CLASSIFIED
                </div>

                {/* Difficulty Badge */}
                <div
                  className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest rounded-none border-2"
                  style={{
                    backgroundColor: difficultyColors[problem.difficulty as keyof typeof difficultyColors].bg,
                    borderColor: difficultyColors[problem.difficulty as keyof typeof difficultyColors].border,
                    color: difficultyColors[problem.difficulty as keyof typeof difficultyColors].text,
                  }}
                >
                  {problem.difficulty}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-[#FFB800] transition">
                  {problem.title}
                </h3>

                <p className="text-[#A0A0A0] text-sm mb-4">
                  {problem.description}
                </p>

                {expanded === problem.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-[#D42D1F]/30"
                  >
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">
                      {problem.details}
                    </p>
                  </motion.div>
                )}

                <div className="mt-4 text-[#FFB800] text-xs font-bold cursor-pointer hover:text-white transition">
                  {expanded === problem.id ? 'COLLAPSE' : 'VIEW DETAILS'}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
