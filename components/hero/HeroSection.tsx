'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Radio, TrendingUp, Users, Award } from 'lucide-react';

// Custom Radar Shader Material
const RadarMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.46, 0.54, 0.28),
    accentColor: new THREE.Color(0.83, 0.18, 0.12),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    uniform vec3 accentColor;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Radar sweep
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      float sweep = mod(angle + time * 2.0, 6.28318);
      float sweepGlow = smoothstep(0.3, 0.0, sweep);
      
      // Concentric circles
      float rings = sin(dist * 30.0 - time * 2.0) * 0.5 + 0.5;
      rings = smoothstep(0.4, 0.6, rings);
      
      // Grid lines
      float gridX = abs(fract(vUv.x * 20.0) - 0.5) * 2.0;
      float gridY = abs(fract(vUv.y * 20.0) - 0.5) * 2.0;
      float grid = min(gridX, gridY);
      grid = smoothstep(0.9, 1.0, grid);
      
      // Combine effects
      vec3 finalColor = color;
      finalColor = mix(finalColor, accentColor, sweepGlow * 0.7);
      finalColor += rings * 0.2;
      finalColor += grid * 0.15;
      
      // Fade at edges
      float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
      alpha *= 0.6;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ RadarMaterial });

// Radar Display Component
const RadarDisplay = () => {
  const materialRef = useRef<any>();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 6, 1, 1]} />
      <radarMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

// 3D Target Markers
const TargetMarkers = () => {
  const markersRef = useRef<THREE.Group>(null);

  const markers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        Math.cos((i / 12) * Math.PI * 2) * 2,
        0.1,
        Math.sin((i / 12) * Math.PI * 2) * 2,
      ] as [number, number, number],
      delay: i * 0.1,
    }));
  }, []);

  useFrame((state) => {
    if (markersRef.current) {
      markersRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={markersRef}>
      {markers.map((marker, index) => (
        <mesh key={index} position={marker.position}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#D42D1F"
            emissive="#D42D1F"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Typing Animation Hook
const useTypingEffect = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = React.useState('');

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

// Terminal-style Status Component
const TerminalStatus = () => {
  const status1 = useTypingEffect('> SYSTEM STATUS: OPERATIONAL', 30);
  const status2 = useTypingEffect('> MISSION TYPE: HACKATHON_DEFENCE_2026', 30);
  const status3 = useTypingEffect('> CLEARANCE LEVEL: CLASSIFIED', 30);

  return (
    <div className="font-mono text-xs md:text-sm space-y-1 text-[#768948]">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-[#D42D1F] animate-pulse"></div>
        <span>{status1}</span>
      </div>
      <div className="flex items-center space-x-2 opacity-80">
        <div className="w-2 h-2 bg-[#768948]"></div>
        <span>{status2}</span>
      </div>
      <div className="flex items-center space-x-2 opacity-60">
        <div className="w-2 h-2 bg-[#607744]"></div>
        <span>{status3}</span>
      </div>
    </div>
  );
};

// Main Hero Component - Concept 3
const HeroRadar = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(118,137,72,0.03)_2px,rgba(118,137,72,0.03)_4px)] pointer-events-none z-20"></div>

      {/* 3D Radar Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 4, 0], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 5, 0]} intensity={1} color="#768948" />
          
          <RadarDisplay />
          <TargetMarkers />
        </Canvas>
      </div>

      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Radio className="w-5 h-5 text-[#D42D1F] animate-pulse" />
                <span className="font-mono text-sm text-[#768948] uppercase tracking-wider">
                  TACTICAL OPERATIONS CENTER
                </span>
              </div>
              <TerminalStatus />
            </div>

            <div className="text-right font-mono text-xs text-gray-600">
              <div>LAT: 19.0760° N</div>
              <div>LONG: 72.8777° E</div>
              <div className="text-[#D42D1F] mt-1">LIVE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-block mb-4 px-4 py-1 border border-[#D42D1F]/30 bg-[#D42D1F]/5">
              <span className="font-mono text-xs text-[#D42D1F] uppercase tracking-[0.3em]">
                Incoming Transmission
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 leading-none">
              <div className="relative inline-block">
                <span
                  className="font-['Rajdhani'] uppercase tracking-tight"
                  style={{
                    textShadow:
                      '0 0 20px rgba(212,45,31,0.3), 0 0 40px rgba(212,45,31,0.2), 0 0 60px rgba(212,45,31,0.1)',
                  }}
                >
                  OPERATION
                </span>
              </div>
              <br />
              <span className="relative inline-block text-[#D42D1F]">
                <span
                  className="font-['Rajdhani'] uppercase tracking-tight"
                  style={{
                    textShadow:
                      '0 0 30px rgba(212,45,31,0.5), 0 0 60px rgba(212,45,31,0.3)',
                  }}
                >
                  HACKFORCE
                </span>
              </span>
            </h1>

            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-[#D42D1F] to-transparent"></div>
          </motion.div>

          {/* Mission Brief */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-6">
              Deploy elite squads for a 48-hour tactical mission. Develop cutting-edge{' '}
              <span className="text-white font-medium">hardware</span> and{' '}
              <span className="text-white font-medium">software</span> solutions for modern defence challenges.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, value: '100+', label: 'Operatives' },
              { icon: TrendingUp, value: '48', label: 'Hours' },
              { icon: Award, value: '₹50K', label: 'Rewards' },
              { icon: Radio, value: '2', label: 'Tracks' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="relative group"
              >
                <div
                  className="p-6 bg-[#0A0A0A]/50 border border-[#768948]/20 backdrop-blur-sm hover:border-[#D42D1F]/40 transition-all"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                  }}
                >
                  <stat.icon className="w-8 h-8 text-[#768948] mx-auto mb-3 group-hover:text-[#D42D1F] transition-colors" />
                  <div className="text-3xl font-bold text-white font-['Rajdhani'] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-[#D42D1F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              className="group relative px-10 py-4 bg-[#D42D1F] text-white font-bold text-base uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,45,31,0.5),0_0_80px_rgba(212,45,31,0.3)]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center space-x-3">
                <span>Deploy Now</span>
                <div className="w-2 h-2 bg-white animate-ping"></div>
              </span>
            </button>

            <button
              className="px-10 py-4 border-2 border-[#768948] text-white font-semibold text-base uppercase tracking-[0.2em] hover:bg-[#768948]/10 transition-all"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
              }}
            >
              Mission Brief
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD Info */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end font-mono text-xs text-gray-600">
            <div>
              <div className="mb-1 text-[#768948]">MISSION DATE</div>
              <div className="text-white text-sm">MARCH 15-17, 2026</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-[#768948]">ORGANIZED BY</div>
              <div className="text-white text-sm">I-CELL INNOVATION HQ</div>
            </div>
            <div className="text-right">
              <div className="mb-1 text-[#768948]">SECURITY CODE</div>
              <div className="text-[#D42D1F] text-sm">H4CK-2026-DEF</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chromatic Aberration on Edges */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(212,45,31,0.1)]"></div>
      </div>
    </section>
  );
};

export default HeroRadar;
