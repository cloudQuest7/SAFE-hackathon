"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion'

/* ─── Data ─────────────────────────────────────────────────── */
interface Checkpoint {
  id: number
  title: string
  date: string
  desc: string
  /** 0-1: where along the path this flag sits */
  t: number
  flagSide: 'left' | 'right'
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: 1,
    title: 'Registration Ends',
    date: '10 March',
    desc: 'Last chance to secure your position on the battlefield.',
    t: 0.22,
    flagSide: 'right',
  },
  {
    id: 2,
    title: 'Launch',
    date: '13 March',
    desc: 'Mission briefing commences. Objectives revealed.',
    t: 0.47,
    flagSide: 'left',
  },
  {
    id: 3,
    title: 'Build',
    date: '14 March',
    desc: 'Boots on the ground. Build phase begins.',
    t: 0.73,
    flagSide: 'right',
  },
  {
    id: 4,
    title: 'Pitch',
    date: '15 March',
    desc: 'Present your solution. Command awaits your report.',
    t: 0.98,
    flagSide: 'left',
  },
]

/* ─── SVG track path (S-curve, 900x700 viewBox) ────────────── */
const TRACK_D =
  'M 62,95 C 210,72 430,66 640,102 C 780,126 865,197 850,278 C 835,354 752,374 638,354 C 492,328 376,356 302,424 C 219,498 244,570 366,590 C 456,605 590,584 720,600'

/* ─── Helpers ───────────────────────────────────────────────── */
function getPathPos(
  path: SVGPathElement,
  t: number,
  totalLen: number,
): { x: number; y: number; angle: number } {
  const len = Math.max(0, Math.min(totalLen, t * totalLen))
  const pt = path.getPointAtLength(len)
  const delta = Math.min(4, totalLen - len)
  const pt2 = path.getPointAtLength(len + delta)
  const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI)
  return { x: pt.x, y: pt.y, angle }
}

/* ─── Pixel tank SVG (placeholder — swap out with your asset) ── */
function TankSVG({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle}) scale(1.5)`}>
      {/* ── Ground shadow ── */}
      <ellipse cx="0" cy="16" rx="29" ry="5.5" fill="rgba(0,0,0,0.75)" />
      {/* ── Lower chassis / track housing ── */}
      <rect x="-26" y="3" width="52" height="13" rx="3" fill="#111008" stroke="#2a3818" strokeWidth="0.7" />
      {/* ── Tread pattern ── */}
      <rect x="-26" y="4" width="52" height="11" rx="2.5" fill="none"
        stroke="#38481c" strokeWidth="0.6" strokeDasharray="4.5 3" />
      {/* ── Road wheels ── */}
      {([-18, -9, 0, 9, 18] as number[]).map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="11" r="4.2" fill="#0c0a06" stroke="#364820" strokeWidth="0.7" />
          <circle cx={cx} cy="11" r="1.8" fill="#1c2010" />
        </g>
      ))}
      {/* ── Drive sprocket (rear) ── */}
      <circle cx="-24" cy="9" r="5" fill="#121008" stroke="#486030" strokeWidth="0.9" />
      <circle cx="-24" cy="9" r="2.2" fill="#1e2610" />
      {/* ── Idler wheel (front) ── */}
      <circle cx="24" cy="9" r="5" fill="#121008" stroke="#486030" strokeWidth="0.9" />
      {/* ── Hull body ── */}
      <rect x="-24" y="-13" width="48" height="18" rx="3" fill="#283818" stroke="#18280e" strokeWidth="0.9" />
      {/* ── Hull top face — upward lit ── */}
      <rect x="-22" y="-13" width="44" height="9" rx="2" fill="#374e20" />
      {/* ── Armour seam lines ── */}
      <line x1="-11" y1="-13" x2="-11" y2="5" stroke="#18280e" strokeWidth="0.6" opacity="0.7" />
      <line x1="7" y1="-13" x2="7" y2="5" stroke="#18280e" strokeWidth="0.6" opacity="0.7" />
      {/* ── Rear exhaust vents ── */}
      <rect x="-27" y="-7" width="5" height="2" rx="0.6" fill="#050404" />
      <rect x="-27" y="-4" width="5" height="2" rx="0.6" fill="#050404" />
      <rect x="-27" y="-1" width="5" height="2" rx="0.6" fill="#050404" />
      {/* ── Side skirt ── */}
      <rect x="-27" y="-2" width="54" height="4.5" rx="2" fill="#202e14" stroke="#2c3c1a" strokeWidth="0.4" />
      {/* ── Turret ring ── */}
      <ellipse cx="-1" cy="-11" rx="13" ry="12" fill="#223016" stroke="#18260e" strokeWidth="0.7" />
      {/* ── Turret dome ── */}
      <ellipse cx="-1" cy="-15" rx="11" ry="9.5" fill="#344820" stroke="#243614" strokeWidth="0.9" />
      {/* ── Turret top lit face ── */}
      <ellipse cx="-1" cy="-16" rx="8" ry="5.5" fill="#4a6430" opacity="0.60" />
      {/* ── Commander hatch ── */}
      <circle cx="-4" cy="-19" r="4" fill="#1e2c10" stroke="#4a6228" strokeWidth="0.9" />
      <circle cx="-4" cy="-19" r="2.2" fill="#131a0c" />
      <circle cx="-4" cy="-19" r="0.9" fill="#364820" />
      {/* ── Main gun barrel ── */}
      <rect x="8" y="-25" width="26" height="5" rx="2" fill="#1e2e10" stroke="#304420" strokeWidth="0.7" />
      {/* ── Muzzle brake ── */}
      <rect x="32" y="-26.5" width="5.5" height="7.5" rx="1.2" fill="#141e0a" stroke="#364c20" strokeWidth="0.6" />
      <line x1="33.2" y1="-24" x2="33.2" y2="-21" stroke="#080c06" strokeWidth="0.8" opacity="0.8" />
      <line x1="35.5" y1="-24" x2="35.5" y2="-21" stroke="#080c06" strokeWidth="0.8" opacity="0.8" />
      {/* ── Stowage box on turret rear ── */}
      <rect x="-16" y="-19" width="13" height="6" rx="1" fill="#243418" stroke="#364c22" strokeWidth="0.5" />
      {/* ── Antenna ── */}
      <line x1="-20" y1="-13" x2="-24" y2="-30" stroke="#486030" strokeWidth="0.7" opacity="0.75" />
      {/* ══ RIM LIGHTING — key light from above-right ══ */}
      {/* Hull top edge rim */}
      <rect x="-22" y="-13" width="44" height="2.5" rx="1" fill="#a8c870" opacity="0.22" />
      {/* Turret top rim */}
      <ellipse cx="-1" cy="-24" rx="8.5" ry="2" fill="#c0e080" opacity="0.16" />
      {/* Barrel top rim */}
      <rect x="10" y="-25" width="22" height="1.5" rx="0.7" fill="#b8d068" opacity="0.20" />
      {/* Left back-scatter */}
      <rect x="-27" y="-13" width="2.5" height="18" rx="1" fill="#608040" opacity="0.13" />
    </g>
  )
}

/* ─── Dust Particle ─────────────────────────────────────────── */
function DustParticle({ ox, oy }: { ox: number; oy: number }) {
  const spreadX = (Math.random() - 0.5) * 24
  const spreadY = (Math.random() - 0.5) * 10 - 5
  const size = Math.random() * 3.2 + 0.6
  const col = Math.random() > 0.55
    ? '#6a8840'
    : (Math.random() > 0.5 ? '#4a5c28' : '#98b060')
  return (
    <motion.circle
      cx={ox + (Math.random() - 0.5) * 8}
      cy={oy + Math.random() * 4}
      r={size}
      fill={col}
      initial={{ opacity: 0.80, scale: 1 }}
      animate={{ opacity: 0, scale: 3.8, x: spreadX, y: spreadY }}
      transition={{ duration: Math.random() * 0.45 + 0.70, ease: 'easeOut' }}
    />
  )
}

/* ─── Checkpoint Card ───────────────────────────────────────── */
interface CardProps {
  cp: Checkpoint
  pos: { x: number; y: number }
  active: boolean
  isFinal: boolean
  pingKey: number
}

function CheckpointCard({ cp, pos, active, isFinal, pingKey }: CardProps) {
  const CARD_W = 150
  const CARD_H = 115
  const POLE_H = 36

  const dir   = cp.flagSide === 'right' ? 1 : -1
  const poleX = pos.x + dir * 22
  const poleTopY = pos.y - POLE_H

  /* Card sits beside the pole — fits within the 420-wide zoomed viewport */
  const cardX = cp.flagSide === 'right' ? poleX + 10 : poleX - CARD_W - 10
  const cardY = poleTopY - 14

  return (
    <g>
      {/* Radar ping burst — fires once on each activation */}
      {pingKey > 0 && [0, 1, 2].map((ring) => (
        <motion.circle
          key={`ping-${pingKey}-${ring}`}
          cx={pos.x} cy={pos.y}
          r={7}
          fill="none"
          stroke={isFinal ? '#FFB800' : '#D42D1F'}
          strokeWidth={2 - ring * 0.4}
          initial={{ r: 7, opacity: 0.9 }}
          animate={{ r: 44 + ring * 16, opacity: 0 }}
          transition={{ duration: 1.4, delay: ring * 0.22, ease: 'easeOut' }}
        />
      ))}

      {/* Map-pin diamond marker on route */}
      <motion.polygon
        points={`${pos.x},${pos.y - 8} ${pos.x + 6},${pos.y} ${pos.x},${pos.y + 8} ${pos.x - 6},${pos.y}`}
        fill={active ? '#D42D1F' : '#4a5e35'}
        stroke={active ? '#FFB800' : '#607744'}
        strokeWidth="1.2"
        animate={active ? { scale: [0.8, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: 'backOut' }}
        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
      />

      {/* Continuous pulse ring when active — centered on diamond */}
      {active && (
        <motion.circle
          cx={pos.x} cy={pos.y}
          r={isFinal ? 18 : 12}
          fill="none"
          stroke={isFinal ? '#FFB800' : '#D42D1F'}
          strokeWidth="1.5"
          animate={{
            opacity: [0.7, 0.08, 0.7],
            r: isFinal ? [18, 28, 18] : [12, 20, 12],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Flag pole — short, planted into the route */}
      <line
        x1={poleX} y1={pos.y}
        x2={poleX} y2={poleTopY}
        stroke={active ? '#c23a2e' : '#546040'}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pennant flag — compact triangle, map-marker style */}
      <motion.g
        style={{ transformOrigin: `${poleX}px ${poleTopY}px` }}
        animate={active ? { rotate: [0, 4, -2, 3, 0] } : { rotate: [0, 1.5, -0.5, 1, 0] }}
        transition={{ duration: active ? 1.2 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polygon
          points={`${poleX},${poleTopY} ${poleX + dir * 18},${poleTopY + 7} ${poleX},${poleTopY + 16}`}
          fill={active ? '#D42D1F' : '#3d5230'}
          stroke={active ? '#e86050' : '#607744'}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* CP label under pole */}
      <text
        x={poleX} y={pos.y + 19}
        textAnchor="middle"
        fill={active ? '#FFB800' : '#607744'}
        fontSize="9" fontWeight="bold"
        fontFamily="'Courier New', monospace"
        letterSpacing="1"
      >
        CP{cp.id}
      </text>

      {/* Milestone card (foreignObject) — only when active */}
      {active && (
        <foreignObject x={cardX} y={cardY} width={CARD_W} height={CARD_H} overflow="visible">
          {/* @ts-ignore */}
          <div xmlns="http://www.w3.org/1999/xhtml">
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.38, ease: 'backOut' }}
              style={{
                background: 'linear-gradient(160deg, rgba(8,14,6,0.97) 0%, rgba(3,7,3,0.98) 100%)',
                border: '1px solid rgba(90,112,60,0.45)',
                borderLeft: `3px solid ${isFinal ? '#FFB800' : '#CC2A1A'}`,
                borderTop: `1px solid ${isFinal ? 'rgba(255,184,0,0.22)' : 'rgba(204,42,26,0.22)'}`,
                padding: '10px 13px',
                boxShadow: isFinal
                  ? '0 0 44px rgba(255,184,0,0.18), inset 0 0 28px rgba(255,184,0,0.04), 0 12px 48px rgba(0,0,0,0.94)'
                  : '0 0 28px rgba(204,42,26,0.16), inset 0 0 20px rgba(204,42,26,0.03), 0 12px 48px rgba(0,0,0,0.94)',
                backdropFilter: 'blur(16px)',
                width: CARD_W,
                fontFamily: 'inherit',
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.007) 2px, rgba(255,255,255,0.007) 3px)',
              }}
            >
              <p style={{ color: '#FFB800', fontSize: '10px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '3px', fontFamily: "'Courier New', monospace" }}>
                {cp.date}
              </p>
              <p style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.2, marginBottom: '6px' }}>
                {cp.title}
              </p>
              <div style={{ width: '28px', height: '1px', background: '#607744', marginBottom: '6px' }} />
              <p style={{ color: '#A0A0A0', fontSize: '10px', lineHeight: 1.45 }}>
                {cp.desc}
              </p>
            </motion.div>
          </div>
        </foreignObject>
      )}
    </g>
  )
}

/* ─── Main Component ────────────────────────────────────────── */
export default function TimelineSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pathRef    = useRef<SVGPathElement>(null)
  const svgRef     = useRef<SVGSVGElement>(null)
  const [pathLen, setPathLen] = useState(1200)
  const [tankPos, setTankPos] = useState({ x: 62, y: 95, angle: 0 })
  const [activeIds, setActiveIds] = useState<Set<number>>(new Set())
  const [missionComplete, setMissionComplete] = useState(false)
  const [cpPositions, setCpPositions] = useState<Array<{ x: number; y: number }>>([])
  const [dustKey, setDustKey] = useState(0)
  const [pingKeys, setPingKeys] = useState<Record<number, number>>({})
  const lastTRef = useRef(0)
  const prevActiveRef = useRef<Set<number>>(new Set())

  /* Scroll progress — scoped to the tall wrapper so progress = tank position */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const springProg = useSpring(scrollYProgress, { stiffness: 38, damping: 28, mass: 0.9 })

  /* Header fades out once the user starts scrolling into the track */
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18, 0.30], [1, 1, 0])
  const headerY       = useTransform(scrollYProgress, [0, 0.30], [0, -28])

  /* Measure path + set initial checkpoint positions on mount */
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    setPathLen(len)
    const positions = CHECKPOINTS.map((cp) => {
      const pt = path.getPointAtLength(cp.t * len)
      return { x: pt.x, y: pt.y }
    })
    setCpPositions(positions)
    const start = getPathPos(path, 0, len)
    setTankPos(start)
  }, [])

  /* Drive tank on scroll */
  useMotionValueEvent(springProg, 'change', (v) => {
    const path = pathRef.current
    if (!path || pathLen <= 1) return
    const t = Math.max(0, Math.min(1, v))
    const pos = getPathPos(path, t, pathLen)
    setTankPos(pos)

    /* ── Camera: pan the SVG viewBox to follow the tank ── */
    if (svgRef.current) {
      const VW = 420, VH = 325
      // centre tank horizontally, look slightly ahead vertically
      const vx = Math.max(-20, Math.min(900 - VW + 20, pos.x - VW / 2))
      const vy = Math.max(-30, Math.min(700 - VH + 30, pos.y - VH * 0.42))
      svgRef.current.setAttribute('viewBox', `${vx.toFixed(1)} ${vy.toFixed(1)} ${VW} ${VH}`)
    }

    if (Math.abs(t - lastTRef.current) > 0.018) {
      lastTRef.current = t
      setDustKey((k) => k + 1)
    }

    const newActive = new Set<number>()
    const newlyActivated: number[] = []
    CHECKPOINTS.forEach((cp) => {
      if (t >= cp.t - 0.015) {
        newActive.add(cp.id)
        if (!prevActiveRef.current.has(cp.id)) newlyActivated.push(cp.id)
      }
    })
    if (newlyActivated.length > 0) {
      setPingKeys((prev) => {
        const next = { ...prev }
        newlyActivated.forEach((id) => { next[id] = (next[id] || 0) + 1 })
        return next
      })
      newlyActivated.forEach((id) => prevActiveRef.current.add(id))
    }
    setActiveIds(newActive)
    setMissionComplete(t >= 0.96)
  })

  const isActive = (id: number) => activeIds.has(id)

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    /* Tall wrapper = scroll budget. The sticky section stays locked inside it. */
    <div ref={wrapperRef} id="timeline" style={{ height: '500vh', position: 'relative' }}>
    <section
      className="sticky top-0 h-screen flex flex-col justify-center relative bg-gradient-to-b from-[#080808] to-[#1a0d08]"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.035,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col" style={{ height: '100vh' }}>
        {/* Header — fades out on scroll */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center pt-4 pb-2 flex-shrink-0 pointer-events-none relative z-20"
        >
          <p className="text-[#607744] text-xs font-bold tracking-[0.3em] uppercase mb-3 font-mono">
            ◈ Mission Timeline ◈
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide uppercase">
            Tentative Dates
          </h2>
          <p className="text-[#A0A0A0] text-base">
            Navigate the battlefield — four checkpoints to glory.
          </p>
        </motion.div>

        {/* ── DESKTOP: SVG Battlefield Track ── */}
        <div className="hidden md:block w-full relative" style={{ height: 'calc(100vh - 130px)' }}>
          {/* HUD corner frame */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#4a6030] opacity-60" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#4a6030] opacity-60" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#4a6030] opacity-60" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#4a6030] opacity-60" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[7px] text-[#4a6030] tracking-[0.3em] opacity-55">
              FIELD OPS ▸ MISSION INTERFACE ▸ ENCRYPTED
            </div>
            <div className="absolute bottom-2 right-5 font-mono text-[7px] text-[#364824] tracking-widest opacity-45">
              SECTOR: ALPHA-7 ◈ GRID: 04N-28E
            </div>
          </div>
          <svg
            ref={svgRef}
            viewBox="-20 -20 420 325"
            className="w-full h-full"
            style={{ display: 'block', overflow: 'visible' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* ── HUD scan-line grid pattern ── */}
              <pattern id="scanPat" x="0" y="0" width="1" height="7" patternUnits="userSpaceOnUse">
                <line x1="-500" y1="0" x2="2000" y2="0" stroke="rgba(140,190,90,0.016)" strokeWidth="0.4" />
              </pattern>
              {/* ── Atmosphere bloom ── */}
              <radialGradient id="atmosGrad" cx="50%" cy="10%" r="65%">
                <stop offset="0%" stopColor="#1c3018" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#020504" stopOpacity="0" />
              </radialGradient>
              {/* ── Fog pocket ── */}
              <radialGradient id="fogGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3614" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#020504" stopOpacity="0" />
              </radialGradient>
              {/* ── Edge vignette ── */}
              <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="68%">
                <stop offset="30%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              {/* ── Tank rim-light halo — green-tinted ── */}
              <filter id="tankGlow" x="-55%" y="-55%" width="210%" height="210%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
                <feColorMatrix in="blur" type="matrix"
                  values="0.20 0.55 0.12 0 0  0.35 0.85 0.22 0 0  0.08 0.30 0.08 0 0  0 0 0 0.78 0"
                  result="greenHaze" />
                <feMerge>
                  <feMergeNode in="greenHaze" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* ── Mission complete gold burst ── */}
              <filter id="finalGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="9" result="g1" />
                <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="g2" />
                <feMerge>
                  <feMergeNode in="g1" />
                  <feMergeNode in="g1" />
                  <feMergeNode in="g2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* ── Ping halo ── */}
              <filter id="routeHalo" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feComposite in="blur" in2="SourceGraphic" operator="over" />
              </filter>
            </defs>

            {/* Bloom glow under dash */}
            <path d={TRACK_D} fill="none" stroke="#8a3510" strokeWidth="14"
              strokeLinecap="round" opacity="0.35" filter="url(#routeHalo)" />

            {/* Single dashed path — site accent orange */}
            <path d={TRACK_D} fill="none" stroke="#c9581f" strokeWidth="4"
              strokeLinecap="round" strokeDasharray="14 10" opacity="0.95" />

            {/* Hidden path for measurement */}
            <path ref={pathRef} d={TRACK_D} fill="none" stroke="none" strokeWidth="0" />

            {/* Checkpoint flags + milestone cards */}
            {CHECKPOINTS.map((cp, i) => {
              const pos = cpPositions[i]
              if (!pos) return null
              return (
                <CheckpointCard
                  key={cp.id}
                  cp={cp}
                  pos={pos}
                  active={isActive(cp.id)}
                  isFinal={cp.id === 4}
                  pingKey={pingKeys[cp.id] ?? 0}
                />
              )
            })}

            {/* Dust particles */}
            {dustKey > 0 && (
              <g key={dustKey}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <DustParticle key={i} ox={tankPos.x - 16} oy={tankPos.y + 4} />
                ))}
              </g>
            )}

            {/* Tank — outer plain <g> for scroll position, inner motion.g for effects */}
            <g transform={`translate(${tankPos.x}, ${tankPos.y}) scale(1.4)`}>
              <motion.g
                filter={missionComplete ? 'url(#finalGlow)' : 'url(#tankGlow)'}
                animate={missionComplete ? { x: [0, -3, 3, -2, 2, 0], y: [0, 2, -2, 1, 0] } : {}}
                transition={missionComplete ? { duration: 0.4, repeat: 3 } : {}}
              >
                <motion.g
                  animate={{ y: [-0.7, 0.7, -0.7] }}
                  transition={{ duration: 0.36, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <TankSVG angle={tankPos.angle} />
                </motion.g>
              </motion.g>
            </g>

            {/* ── BASE CAMP start marker — HUD reticle ── */}
            <g>
              <rect x="5" y="52" width="58" height="46" rx="2" fill="rgba(2,6,2,0.88)" stroke="#304822" strokeWidth="0.8" />
              {/* Corner brackets */}
              <path d="M5,57 L5,52 L10,52" stroke="#6a8c40" strokeWidth="1.5" fill="none" opacity="0.85" />
              <path d="M58,52 L63,52 L63,57" stroke="#6a8c40" strokeWidth="1.5" fill="none" opacity="0.85" />
              <path d="M5,93 L5,98 L10,98" stroke="#6a8c40" strokeWidth="1.5" fill="none" opacity="0.85" />
              <path d="M58,98 L63,98 L63,93" stroke="#6a8c40" strokeWidth="1.5" fill="none" opacity="0.85" />
              {/* Reticle cross-hair */}
              <circle cx="34" cy="66" r="5.5" fill="none" stroke="#7aa050" strokeWidth="0.8" opacity="0.7" />
              <line x1="26" y1="66" x2="30" y2="66" stroke="#7aa050" strokeWidth="1" opacity="0.7" />
              <line x1="38" y1="66" x2="42" y2="66" stroke="#7aa050" strokeWidth="1" opacity="0.7" />
              <line x1="34" y1="58" x2="34" y2="62" stroke="#7aa050" strokeWidth="1" opacity="0.7" />
              <line x1="34" y1="70" x2="34" y2="74" stroke="#7aa050" strokeWidth="1" opacity="0.7" />
              <circle cx="34" cy="66" r="1.2" fill="#7aa050" opacity="0.55" />
              <text x="34" y="84" textAnchor="middle" fill="#8aaa52" fontSize="8" fontWeight="800"
                fontFamily="'Courier New',monospace" letterSpacing="1.5">START</text>
              <text x="34" y="93" textAnchor="middle" fill="#496030" fontSize="6.5"
                fontFamily="'Courier New',monospace" letterSpacing="0.8">BASE CAMP</text>
            </g>


            {/* Mission Complete overlay */}
            {missionComplete && (
              <motion.g
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                <rect x="268" y="14" width="364" height="52" rx="4" fill="rgba(9,13,7,0.94)" stroke="#FFB800" strokeWidth="1.5" />
                <text x="450" y="36" textAnchor="middle" fill="#FFB800" fontSize="12" fontWeight="bold" fontFamily="'Courier New',monospace" letterSpacing="3">
                  ◈ MISSION COMPLETE ◈
                </text>
                <text x="450" y="55" textAnchor="middle" fill="#A0A0A0" fontSize="9" fontFamily="'Courier New',monospace" letterSpacing="1">
                  All objectives secured. Good work, soldier.
                </text>
              </motion.g>
            )}
          </svg>
        </div>

        {/* ── MOBILE: Vertical winding track ── */}
        <div className="md:hidden relative px-2 pt-4">
          {/* Vertical road strip */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 pointer-events-none">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(to bottom, #342816, #483c22, #342816)',
                boxShadow: '0 0 20px rgba(0,0,0,0.6)',
              }}
            />
            {/* Dashed centre line */}
            <div
              className="absolute inset-y-0 left-1/2 w-px"
              style={{
                background:
                  'repeating-linear-gradient(to bottom, #8a7252 0px, #8a7252 12px, transparent 12px, transparent 22px)',
                opacity: 0.38,
              }}
            />
          </div>

          <div className="relative flex flex-col gap-0 py-6">
            {CHECKPOINTS.map((cp, i) => {
              const isRight = cp.flagSide === 'right'
              const active = isActive(cp.id)
              const isFinal = cp.id === 4

              return (
                <motion.div
                  key={cp.id}
                  initial={{ opacity: 0, x: isRight ? 28 : -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-3 mb-14 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Milestone card */}
                  <div className={`flex-1 ${isRight ? 'text-right items-end' : 'text-left items-start'} flex flex-col`}>
                    <motion.div
                      animate={
                        active
                          ? {
                              boxShadow: isFinal
                                ? '0 0 22px rgba(255,184,0,0.32)'
                                : '0 0 14px rgba(212,45,31,0.22)',
                            }
                          : {}
                      }
                      className="inline-block p-4 bg-[#0e1a0c]/90 backdrop-blur-sm"
                      style={{
                        border: '1px solid #607744',
                        borderLeft: isRight ? '1px solid #607744' : `3px solid ${active ? (isFinal ? '#FFB800' : '#D42D1F') : '#607744'}`,
                        borderRight: isRight ? `3px solid ${active ? (isFinal ? '#FFB800' : '#D42D1F') : '#607744'}` : '1px solid #607744',
                      }}
                    >
                      <p className="text-[#FFB800] text-[10px] font-bold tracking-widest uppercase mb-1 font-mono">
                        {cp.date}
                      </p>
                      <h3 className="text-white font-black text-sm uppercase tracking-wide leading-tight">
                        {cp.title}
                      </h3>
                      <div className={`w-8 h-px bg-[#607744] my-2 ${isRight ? 'ml-auto' : ''}`} />
                      <p className="text-[#A0A0A0] text-xs leading-relaxed">{cp.desc}</p>
                    </motion.div>
                  </div>

                  {/* Centre flag node */}
                  <div className="relative z-10 flex flex-col items-center flex-shrink-0 w-10">
                    <motion.div
                      className="w-6 h-4 mb-0.5"
                      style={{
                        background: active ? '#D42D1F' : '#3a4e25',
                        clipPath: 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)',
                      }}
                      animate={active ? { x: [0, 2, -1, 2, 0] } : { x: [0, 1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <div className="w-0.5 h-5" style={{ background: active ? '#D42D1F' : '#607744' }} />
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: active ? '#D42D1F' : '#607744',
                        background: active ? 'rgba(212,45,31,0.2)' : 'rgba(96,119,68,0.1)',
                        boxShadow: active
                          ? isFinal
                            ? '0 0 12px rgba(255,184,0,0.65)'
                            : '0 0 10px rgba(212,45,31,0.65)'
                          : 'none',
                      }}
                    />
                    <p
                      className="text-[9px] font-bold font-mono mt-0.5"
                      style={{ color: active ? '#FFB800' : '#607744' }}
                    >
                      CP{cp.id}
                    </p>
                  </div>

                  {/* Spacer to balance layout */}
                  <div className="flex-1" />
                </motion.div>
              )
            })}

            {/* Mobile mission complete */}
            {missionComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-4 py-4 border border-[#FFB800] bg-[#0e1a0c]/80 font-mono"
              >
                <p className="text-[#FFB800] text-sm font-bold tracking-[0.2em] uppercase">
                  ◈ Mission Complete ◈
                </p>
                <p className="text-[#A0A0A0] text-xs mt-1">All objectives secured.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-[#607744] text-xs font-mono tracking-[0.25em] uppercase mt-4 hidden md:block"
        >
          ▸ Scroll to advance the mission ◂
        </motion.p>
      </div>
    </section>
    </div>
  )
}