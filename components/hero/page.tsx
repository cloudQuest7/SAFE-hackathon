"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { motion } from 'framer-motion';
import ShinyText from '@/components/ShinyText';

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
      <StarsBackground 
        starColor="#9be3ff" 
        pointerEvents={false}
        factor={0.08}
        speed={40}
      />
      </div>

    </section>
  );
};

export default Hero;
