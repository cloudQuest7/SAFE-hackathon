"use client"

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import WorldMap from '@/components/ui/world-map'

/* ─── Track Data ─────────────────────────────────────────────── */
type ThreatLevel = 'Elevated' | 'Critical' | 'Moderate' | 'Secure' | 'Classified'

interface Track {
  id: number
  code: string
  division: string
  title: string
  objective: string
  description: string
  threatLevel: ThreatLevel
  color: string
  glowColor: string
  focusAreas: string[]
  challenges: string[]
  impact: string
  stats: { label: string; value: string }[]
  buttonLabel: string
  // position as % on the India map SVG viewport (850×600)
  x: number
  y: number
  isOffMap?: boolean
  multiMarkers?: { x: number; y: number }[]
}

const TRACKS: Track[] = [
  {
    id: 1,
    code: 'T-01',
    division: 'Land Operations Division',
    title: 'Soldier Safety & Survivability',
    objective: 'Enhance soldier protection and battlefield survivability.',
    description: 'Develop next-gen systems that proactively shield soldiers from physical, environmental, and biological threats. Solutions should integrate real-time health telemetry, adaptive protective gear, and automated trauma response to minimize casualties during active operations.',
    threatLevel: 'Elevated',
    color: '#22c55e',
    glowColor: 'rgba(34,197,94,0.6)',
    focusAreas: ['Wearable health monitoring', 'Blast-resistant gear', 'Trauma automation', 'Threat detection', 'Environmental hazard monitoring'],
    challenges: [
      'Design a wearable biosensor suite that monitors vitals and auto-alerts medics when a soldier is injured.',
      'Build an AI system that predicts environmental hazards (chemical, heat, altitude) and recommends protective action.',
      'Create a smart tourniquet or first-aid device that can be deployed autonomously on the battlefield.',
    ],
    impact: 'Reducing frontline casualty rates through proactive systems.',
    stats: [
      { label: 'Priority', value: 'HIGH' },
      { label: 'Teams Expected', value: '30+' },
      { label: 'Domain', value: 'IoT / MedTech / AI' },
    ],
    buttonLabel: 'Deploy to Division',
    x: 52,
    y: 14,
  },
  {
    id: 2,
    code: 'T-02',
    division: 'Intelligence & Recon Division',
    title: 'Surveillance & Reconnaissance',
    objective: 'Improve situational awareness and intelligence accuracy.',
    description: 'Engineer autonomous and semi-autonomous platforms that gather, process, and relay battlefield intelligence. Solutions should leverage AI, advanced optics, and multi-spectrum sensing to provide commanders with real-time, actionable intelligence across all terrains.',
    threatLevel: 'Elevated',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.6)',
    focusAreas: ['Autonomous drones', 'AI threat classification', 'Long-range comms', 'Thermal & night vision', 'Underwater monitoring'],
    challenges: [
      'Build a drone swarm coordination system that autonomously maps hostile terrain and identifies threats.',
      'Develop an AI model that classifies and prioritizes threats from multi-sensor feeds in under 2 seconds.',
      'Create a compact, low-power underwater surveillance node for coastal defense monitoring.',
    ],
    impact: 'Improves situational awareness and intelligence accuracy.',
    stats: [
      { label: 'Priority', value: 'HIGH' },
      { label: 'Teams Expected', value: '25+' },
      { label: 'Domain', value: 'AI / Robotics / CV' },
    ],
    buttonLabel: 'Deploy to Division',
    x: 28,
    y: 22,
  },
  {
    id: 3,
    code: 'T-03',
    division: 'Cyber Warfare Division',
    title: 'Cybersecurity & Secure Communication',
    objective: 'Prevent digital compromise in adversarial environments.',
    description: 'Architect resilient cyber-defense frameworks and encrypted communication channels capable of withstanding state-level adversarial attacks. Solutions must ensure data integrity, signal security, and zero-trust authentication across contested electromagnetic environments.',
    threatLevel: 'Critical',
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.6)',
    focusAreas: ['Encrypted protocols', 'Intrusion detection', 'Secure data transmission', 'Anti-jamming', 'Blockchain logistics'],
    challenges: [
      'Design a zero-trust mesh network protocol that maintains secure comms even when 40% of nodes are compromised.',
      'Build an AI-driven intrusion detection system that identifies novel attack vectors in real-time.',
      'Develop an anti-jamming communication relay that auto-switches frequencies under electronic warfare conditions.',
    ],
    impact: 'Prevents digital compromise in adversarial environments.',
    stats: [
      { label: 'Priority', value: 'CRITICAL' },
      { label: 'Teams Expected', value: '20+' },
      { label: 'Domain', value: 'Cyber / Blockchain / ML' },
    ],
    buttonLabel: 'Access Cyber Division',
    x: 50,
    y: 42,
    isOffMap: false,
  },
  {
    id: 4,
    code: 'T-04',
    division: 'Operational Support Command',
    title: 'Logistics & Resource Management',
    objective: 'Ensure sustained operational capability.',
    description: 'Optimize the defense supply chain through intelligent automation, predictive analytics, and sustainable resource management. Solutions should address the unique challenges of military logistics — from remote base resupply to convoy protection and energy independence in forward-deployed positions.',
    threatLevel: 'Moderate',
    color: '#eab308',
    glowColor: 'rgba(234,179,8,0.6)',
    focusAreas: ['Predictive maintenance', 'Smart inventory', 'Convoy route optimization', 'Energy solutions', 'Water purification'],
    challenges: [
      'Build a predictive maintenance platform that forecasts equipment failure 72 hours in advance using sensor data.',
      'Design an AI-powered convoy routing system that adapts in real-time to threat intelligence and terrain changes.',
      'Create a portable, solar-powered water purification unit for forward-deployed troops in arid environments.',
    ],
    impact: 'Ensures sustained operational capability.',
    stats: [
      { label: 'Priority', value: 'MODERATE' },
      { label: 'Teams Expected', value: '20+' },
      { label: 'Domain', value: 'ML / IoT / CleanTech' },
    ],
    buttonLabel: 'Deploy to Division',
    x: 50,
    y: 50,
  },
  {
    id: 5,
    code: 'T-05',
    division: 'Defense Training Command',
    title: 'Training & Simulation',
    objective: 'Improve readiness without real-world risk.',
    description: 'Build immersive, data-driven training environments that prepare soldiers for the complexities of modern warfare. Solutions should combine VR/AR technologies, AI-driven adversary simulation, and performance analytics to create adaptive training that evolves with each soldier\'s skill level.',
    threatLevel: 'Secure',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.6)',
    focusAreas: ['VR/AR combat simulation', 'Tactical training platforms', 'Performance analytics', 'Psychological resilience tools'],
    challenges: [
      'Develop a VR combat simulation that adapts difficulty based on real-time biometric stress indicators.',
      'Build an AI opponent system that learns and evolves tactics to continuously challenge trainees.',
      'Create a psychological resilience training module using biofeedback and guided scenario therapy.',
    ],
    impact: 'Improves readiness without real-world risk.',
    stats: [
      { label: 'Priority', value: 'STANDARD' },
      { label: 'Teams Expected', value: '15+' },
      { label: 'Domain', value: 'XR / AI / GameDev' },
    ],
    buttonLabel: 'Deploy to Division',
    x: 65,
    y: 55,
  },
  {
    id: 6,
    code: 'T-06',
    division: 'Special Projects Division',
    title: 'Open Innovation',
    objective: 'Propose unconventional defense solutions beyond defined categories.',
    description: 'This track is for the mavericks. If your idea doesn\'t fit neatly into the other five tracks but could fundamentally change how defense operates, this is where it belongs. We\'re looking for disruptive, cross-domain concepts that challenge conventional thinking — from quantum sensing to bio-inspired robotics to AI ethics frameworks for autonomous weapons.',
    threatLevel: 'Classified',
    color: '#94a3b8',
    glowColor: 'rgba(148,163,184,0.6)',
    focusAreas: ['Unconventional defense tech', 'Cross-domain innovation', 'Emerging technologies', 'Disruptive concepts'],
    challenges: [
      'Propose a novel application of quantum computing or quantum sensing for defense intelligence.',
      'Design a bio-inspired autonomous system for search-and-rescue in disaster or combat zones.',
      'Build an ethical decision-making framework for autonomous weapons systems with human-in-the-loop override.',
    ],
    impact: 'Unlocks breakthrough capabilities through unconstrained innovation.',
    stats: [
      { label: 'Priority', value: 'CLASSIFIED' },
      { label: 'Teams Expected', value: '10+' },
      { label: 'Domain', value: 'Wildcard / Multi' },
    ],
    buttonLabel: 'Submit Special Proposal',
    x: 88,
    y: 8,
    isOffMap: true,
  },
]

const THREAT_COLORS: Record<ThreatLevel, string> = {
  Elevated: '#ef4444',
  Critical: '#dc2626',
  Moderate: '#eab308',
  Secure: '#22c55e',
  Classified: '#94a3b8',
}

/* ─── Defense network connection lines (lat/lng pairs for WorldMap) ── */
const DEFENSE_NETWORK_DOTS = [
  { start: { lat: 28.6, lng: 77.2 }, end: { lat: 34.1, lng: 74.8 } },   // Delhi → Srinagar
  { start: { lat: 28.6, lng: 77.2 }, end: { lat: 19.1, lng: 72.9 } },   // Delhi → Mumbai
  { start: { lat: 28.6, lng: 77.2 }, end: { lat: 22.6, lng: 88.4 } },   // Delhi → Kolkata
  { start: { lat: 19.1, lng: 72.9 }, end: { lat: 13.0, lng: 77.6 } },   // Mumbai → Bengaluru
  { start: { lat: 22.6, lng: 88.4 }, end: { lat: 26.1, lng: 91.7 } },   // Kolkata → Guwahati
  { start: { lat: 13.0, lng: 77.6 }, end: { lat: 11.7, lng: 92.7 } },   // Bengaluru → Port Blair
]

/* ─── Radar Sweep ────────────────────────────────────────────── */
const RadarSweep = memo(function RadarSweep() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: 0 }}>
      <div
        className="absolute"
        style={{
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          animation: 'radar-sweep 14s linear infinite',
          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 330deg, rgba(34,197,94,0.06) 340deg, rgba(34,197,94,0.12) 355deg, transparent 360deg)',
          transformOrigin: 'center center',
        }}
      />
    </div>
  )
})

/* ─── Grid Overlay ───────────────────────────────────────────── */
const GridOverlay = memo(function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  )
})

/* ─── Data Particles ─────────────────────────────────────────── */
// Deterministic particle data (no Math.random on render to avoid hydration mismatch)
const PARTICLE_DATA = [
  { x: 12, y: 8, duration: 10, delay: 0, size: 1 },
  { x: 25, y: 45, duration: 14, delay: 2, size: 2 },
  { x: 38, y: 22, duration: 9, delay: 4, size: 1 },
  { x: 55, y: 67, duration: 16, delay: 1, size: 2 },
  { x: 70, y: 15, duration: 11, delay: 3, size: 1 },
  { x: 83, y: 38, duration: 13, delay: 5, size: 2 },
  { x: 92, y: 72, duration: 8, delay: 0.5, size: 1 },
  { x: 7, y: 58, duration: 15, delay: 6, size: 2 },
  { x: 48, y: 91, duration: 12, delay: 2.5, size: 1 },
  { x: 63, y: 50, duration: 10, delay: 7, size: 2 },
  { x: 18, y: 80, duration: 17, delay: 1.5, size: 1 },
  { x: 76, y: 30, duration: 9, delay: 4.5, size: 2 },
  { x: 33, y: 55, duration: 14, delay: 3.5, size: 1 },
  { x: 88, y: 88, duration: 11, delay: 6.5, size: 2 },
  { x: 44, y: 12, duration: 16, delay: 0.8, size: 1 },
  { x: 60, y: 77, duration: 8, delay: 5.5, size: 2 },
  { x: 22, y: 33, duration: 13, delay: 2.2, size: 1 },
  { x: 95, y: 20, duration: 10, delay: 7.5, size: 2 },
]

const DataParticles = memo(function DataParticles() {
  const particles = PARTICLE_DATA

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
            animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
})

/* ─── Track Marker ───────────────────────────────────────────── */
interface MarkerProps {
  track: Track
  isActive: boolean
  onClick: () => void
  mapWidth: number
  mapHeight: number
}

function TrackMarker({ track, isActive, onClick, mapWidth, mapHeight }: MarkerProps) {
  const [hovered, setHovered] = useState(false)

  const px = (track.x / 100) * mapWidth
  const py = (track.y / 100) * mapHeight

  return (
    <div
      className="absolute cursor-pointer"
      data-track-marker
      style={{ left: px, top: py, transform: 'translate(-50%, -50%)', zIndex: isActive || hovered ? 40 : 10, overflow: 'visible' }}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer pulse ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 36,
          height: 36,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${track.color}`,
          opacity: isActive ? 0.8 : 0.3,
          animation: 'marker-pulse 2.5s ease-out infinite',
          boxShadow: isActive ? `0 0 20px ${track.glowColor}` : 'none',
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: track.color,
          boxShadow: `0 0 10px ${track.glowColor}, 0 0 20px ${track.glowColor}`,
          opacity: isActive ? 1 : 0.7,
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.4)' : 'scale(1)',
          position: 'relative',
          zIndex: 2,
        }}
      />
      {/* Hover label */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute whitespace-nowrap pointer-events-none"
            style={{
              ...(track.y < 20
                ? { top: 18 }
                : { bottom: 18 }),
              ...(track.x > 70
                ? { right: 0, transform: 'none' }
                : track.x < 15
                  ? { left: 0, transform: 'none' }
                  : { left: '50%', transform: 'translateX(-50%)' }),
              background: 'rgba(5,10,5,0.92)',
              border: `1px solid ${track.color}`,
              padding: '5px 12px',
              zIndex: 20,
            }}
          >
            <p
              className="uppercase tracking-widest"
              style={{ fontSize: 11, color: track.color, fontFamily: "'Share Tech Mono', monospace", fontWeight: 700 }}
            >
              {track.code}
            </p>
            <p
              className="uppercase"
              style={{ fontSize: 13, color: '#d8e8d0', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.05em' }}
            >
              {track.division}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Off-map CLASSIFIED label */}
      {track.isOffMap && !isActive && (
        <div
          className="absolute"
          style={{
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <p style={{ fontSize: 7, color: track.color, fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.2em', opacity: 0.8 }}>
            CLASSIFIED
          </p>
        </div>
      )}
    </div>
  )
}

/* ─── Side Panel ─────────────────────────────────────────────── */
interface PanelProps {
  track: Track | null
  onClose: () => void
}

function SidePanel({ track, onClose }: PanelProps) {
  if (!track) return null

  return (
    <div
      className="absolute right-0 top-0 bottom-0 overflow-y-auto"
      data-side-panel
      style={{
        width: 'clamp(280px, 35%, 380px)',
        background: 'rgba(5,10,5,0.97)',
        borderLeft: `1px solid ${track.color}`,
        zIndex: 50,
      }}
    >
      {/* Top status bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: `1px solid ${track.color}30` }}
      >
        <div className="flex items-center gap-2">
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: track.color, boxShadow: `0 0 8px ${track.glowColor}` }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: track.color, letterSpacing: '0.2em' }}>
            {track.code} — DIVISION ACTIVE
          </span>
        </div>
        <button
          onClick={onClose}
          className="transition-opacity hover:opacity-100 opacity-50"
          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: '#94a3b8', letterSpacing: '0.1em' }}
        >
          [ESC]
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Title */}
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 4 }}>TRACK DESIGNATION</p>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 24,
              fontWeight: 900,
              color: '#d8e8d0',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            {track.title}
          </h3>
        </div>

        {/* Objective */}
        <div style={{ borderLeft: `2px solid ${track.color}40`, paddingLeft: 12 }}>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 4 }}>OBJECTIVE</p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: '#a0a0a0', lineHeight: 1.5 }}>
            {track.objective}
          </p>
        </div>

        {/* Description / Briefing */}
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 6 }}>MISSION BRIEFING</p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, color: '#b0b8a8', lineHeight: 1.6 }}>
            {track.description}
          </p>
        </div>

        {/* Focus areas */}
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 8 }}>FOCUS AREAS</p>
          <div className="space-y-2">
            {track.focusAreas.map((area, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
              >
                <div style={{ width: 5, height: 5, backgroundColor: track.color, flexShrink: 0 }} />
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: '#c0c0c0', letterSpacing: '0.05em' }}>
                  {area}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Example Challenges */}
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 8 }}>EXAMPLE PROBLEM STATEMENTS</p>
          <div className="space-y-3">
            {track.challenges.map((challenge, i) => (
              <div
                key={i}
                className="flex gap-2"
                style={{ borderLeft: `2px solid ${track.color}30`, paddingLeft: 10 }}
              >
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: track.color, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: '#b0b0b0', lineHeight: 1.5 }}>
                  {challenge}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div
          className="px-3 py-2"
          style={{ background: `${track.color}08`, border: `1px solid ${track.color}20` }}
        >
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.25em', marginBottom: 4 }}>IMPACT SCOPE</p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: '#a0a0a0', lineHeight: 1.5 }}>
            {track.impact}
          </p>
        </div>

        {/* CTA Button */}
        <button
          className="w-full py-3 font-bold tracking-widest uppercase transition-all duration-300"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13,
            letterSpacing: '0.2em',
            color: '#050a05',
            backgroundColor: track.color,
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        >
          {track.buttonLabel}
        </button>

        {/* Scanline decoration */}
        <div className="mt-4" style={{ height: 1, background: `linear-gradient(90deg, transparent, ${track.color}50, transparent)` }} />
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#2a3a2a', letterSpacing: '0.2em', textAlign: 'center' }}>
          SAFE HACKATHON // DEFENSE INNOVATION COMMAND
        </p>
      </div>
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────────── */
export default function TacticalCommandSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const [bootDone, setBootDone] = useState(false)
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)
  const [mapDims, setMapDims] = useState({ w: 900, h: 480 })
  const [cyberGlitch, setCyberGlitch] = useState(false)
  const [zoomedRegion, setZoomedRegion] = useState<{ x: number; y: number } | null>(null)

  // Boot sequence timing
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setBootDone(true), 2600)
    return () => clearTimeout(t)
  }, [isInView])

  // Responsive map dims
  useEffect(() => {
    const measure = () => {
      if (mapRef.current) {
        setMapDims({ w: mapRef.current.offsetWidth, h: mapRef.current.offsetHeight })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [bootDone])

  const handleMarkerClick = (track: Track) => {
    if (activeTrack?.id === track.id) {
      setActiveTrack(null)
      setZoomedRegion(null)
      setCyberGlitch(false)
      return
    }
    setActiveTrack(track)
    setZoomedRegion({ x: track.x, y: track.y })
    if (track.id === 3) {
      setCyberGlitch(true)
      setTimeout(() => setCyberGlitch(false), 1800)
    } else {
      setCyberGlitch(false)
    }
  }

  const closePanel = () => {
    setActiveTrack(null)
    setZoomedRegion(null)
    setCyberGlitch(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');

        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes marker-pulse {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          70%  { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes particle-float {
          0%   { opacity: 0; transform: translateY(0px); }
          15%  { opacity: 0.6; }
          85%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-60px); }
        }
        @keyframes blink-red {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes glitch-shift {
          0%   { transform: translateX(0); clip-path: inset(0 0 100% 0); }
          10%  { transform: translateX(-3px); clip-path: inset(10% 0 80% 0); }
          20%  { transform: translateX(3px); clip-path: inset(30% 0 50% 0); }
          30%  { transform: translateX(-2px); clip-path: inset(50% 0 30% 0); }
          40%  { transform: translateX(2px); clip-path: inset(70% 0 10% 0); }
          50%  { transform: translateX(0); clip-path: inset(0 0 0 0); }
          100% { transform: translateX(0); clip-path: inset(0 0 0 0); }
        }
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100%; }
        }

        .tac-scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: rgba(34,197,94,0.07);
          animation: scanline 4s linear infinite;
          pointer-events: none;
          z-index: 5;
        }

        .cyber-glitch {
          animation: glitch-shift 1.8s steps(1) forwards;
        }

        .track-route-line {
          stroke-dasharray: 6 4;
          animation: dash-flow 2s linear infinite;
        }
        @keyframes dash-flow {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      <section
        id="problems"
        ref={sectionRef}
        className="relative py-24 px-6 overflow-hidden"
          style={{ background: '#080c08' }}
      >
        {/* Background noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            opacity: 0.025,
          }}
        />

        <div className="max-w-7xl mx-auto">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '0.05em',
                color: '#d8e8d0',
                lineHeight: 1,
                marginBottom: 10,
              }}
            >
              Strategic Operations Command
            </h2>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: '#607744', letterSpacing: '0.1em', fontWeight: 600 }}>
              SELECT YOUR DIVISION AND DEPLOY YOUR SOLUTION
            </p>
          </motion.div>

          {/* ── Boot Sequence ── */}
          <AnimatePresence>
            {isInView && !bootDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                style={{ background: 'rgba(5,10,5,0.88)' }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: '#22c55e', letterSpacing: '0.2em', marginBottom: 20 }}
                >
                  Establishing secure satellite link...
                </motion.p>
                <div style={{ width: 280, height: 2, background: 'rgba(34,197,94,0.15)', position: 'relative', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.4, duration: 1.8, ease: 'easeInOut' }}
                    style={{ height: '100%', background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.8)' }}
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.2, duration: 0.8, repeat: 1 }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#607744', letterSpacing: '0.2em', marginTop: 12 }}
                >
                  AUTH OK · LINK ESTABLISHED · LOADING MAP DATA...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Tactical Map Area ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={bootDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Map container */}
            <div
              ref={mapRef}
              className="relative tac-scanline overflow-hidden"
              onClick={(e) => {
                // Close panel when clicking empty map area (not marker, not sidebar)
                const target = e.target as HTMLElement
                if (target.closest('[data-track-marker]') || target.closest('[data-side-panel]')) return
                closePanel()
              }}
              style={{
                  height: 'clamp(380px, 55vw, 560px)',
                  border: '1px solid rgba(34,197,94,0.12)',
                  background: 'linear-gradient(135deg, #071a0f 0%, #050e09 40%, #040c08 100%)',
                  boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
                }}
            >
              <GridOverlay />
              <RadarSweep />
              <DataParticles />

              {/* Overlay on track activation */}
              {activeTrack && (
                <div
                  className="absolute inset-0 transition-all duration-500 pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.22)', zIndex: 8 }}
                />
              )}

              {/* Cyber glitch overlay */}
              <AnimatePresence>
                {cyberGlitch && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0.4, 0.8, 0.2, 0.6, 0] }}
                    transition={{ duration: 1.8, times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1] }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      zIndex: 25,
                      background: 'repeating-linear-gradient(0deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 2px, transparent 2px, transparent 4px)',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* World Map — dotted style */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                <WorldMap
                  dots={[]}
                  lineColor="#22c55e"
                  dotColor="#4ade8070"
                  bgColor="transparent"
                  className="!aspect-auto h-full w-full !rounded-none [&_img]:opacity-80"
                />
              </div>

              {/* Route lines from active track to other markers */}
              {activeTrack && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 9 }}>
                  {TRACKS.filter(t => t.id !== activeTrack.id).map((t) => {
                    const targets = t.multiMarkers ? t.multiMarkers : [{ x: t.x, y: t.y }]
                    const sources = activeTrack.multiMarkers ? activeTrack.multiMarkers : [{ x: activeTrack.x, y: activeTrack.y }]
                    return sources.map((src, si) =>
                      targets.map((tgt, ti) => (
                        <line
                          key={`route-${t.id}-${si}-${ti}`}
                          x1={`${src.x}%`} y1={`${src.y}%`}
                          x2={`${tgt.x}%`} y2={`${tgt.y}%`}
                          stroke={activeTrack.color}
                          strokeWidth="1"
                          strokeOpacity="0.35"
                          className="track-route-line"
                        />
                      ))
                    )
                  })}
                </svg>
              )}

              {/* Track Markers */}
              {TRACKS.map((track) => {
                if (track.multiMarkers) {
                  return track.multiMarkers.map((m, mi) => (
                    <TrackMarker
                      key={`${track.id}-${mi}`}
                      track={{ ...track, x: m.x, y: m.y }}
                      isActive={activeTrack?.id === track.id}
                      onClick={() => handleMarkerClick(track)}
                      mapWidth={mapDims.w}
                      mapHeight={mapDims.h}
                    />
                  ))
                }
                return (
                  <TrackMarker
                    key={track.id}
                    track={track}
                    isActive={activeTrack?.id === track.id}
                    onClick={() => handleMarkerClick(track)}
                    mapWidth={mapDims.w}
                    mapHeight={mapDims.h}
                  />
                )
              })}

              {/* Zoom indicator ring on active marker */}
              {activeTrack && zoomedRegion && (
                <motion.div
                  key={activeTrack.id}
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute pointer-events-none"
                  style={{
                    left: (zoomedRegion.x / 100) * mapDims.w - 30,
                    top: (zoomedRegion.y / 100) * mapDims.h - 30,
                    width: 60,
                    height: 60,
                    border: `1px solid ${activeTrack.color}`,
                    borderRadius: '50%',
                    zIndex: 9,
                  }}
                />
              )}

              {/* Corner HUD decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-green-900/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-green-900/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-green-900/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-green-900/40" />

              {/* Status strip */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-1 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(34,197,94,0.08)', background: 'rgba(0,0,0,0.4)', zIndex: 6 }}
              >
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#2a3a2a', letterSpacing: '0.2em' }}>
                  GLOBAL · STRATEGIC MAP · CLASSIFIED
                </p>
                <div className="flex items-center gap-2">
                  <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22c55e', animation: 'blink-red 2s ease infinite' }} />
                  <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 8, color: '#22c55e', letterSpacing: '0.2em' }}>LIVE</p>
                </div>
              </div>

              {/* Side Panel */}
              {activeTrack && <SidePanel track={activeTrack} onClose={closePanel} />}
            </div>

            {/* ── Track Legend Row ── */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleMarkerClick(track)}
                  className="flex items-center gap-2 px-4 py-3 transition-all duration-200"
                  style={{
                    border: `1px solid ${activeTrack?.id === track.id ? track.color : 'rgba(96,119,68,0.3)'}`,
                    background: activeTrack?.id === track.id ? `${track.color}12` : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: track.color,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${track.glowColor}`,
                    }}
                  />
                  <div className="text-left min-w-0">
                    <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: track.color, letterSpacing: '0.15em' }}>
                      {track.code}
                    </p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: '#a0a0a0', letterSpacing: '0.05em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Instruction hint ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={bootDone ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mt-4"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: '#2a3a2a', letterSpacing: '0.2em' }}
            >
              SELECT A MARKER OR DIVISION TO ACCESS INTELLIGENCE BRIEFING
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
