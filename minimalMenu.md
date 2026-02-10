'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'hackathon', label: 'Hackathon', href: '#hackathon' },
  { id: 'challenges', label: 'Challenges', href: '#problems' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'prizes', label: 'Prizes', href: '#prizes' },
  { id: 'sponsors', label: 'Sponsors', href: '#sponsors' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

const MinimalSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-[100] mix-blend-difference"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            className="absolute w-8"
            animate={{
              rotate: isOpen ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-[2px] bg-white" />
          </motion.div>
          <motion.div
            className="absolute w-8"
            animate={{
              rotate: isOpen ? -45 : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-[2px] bg-white" />
          </motion.div>
          <motion.div
            className="absolute w-8"
            animate={{
              rotate: 0,
              opacity: isOpen ? 0 : 1,
              y: isOpen ? 0 : 8,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-[2px] bg-white" />
          </motion.div>
        </div>
      </motion.button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[95]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - Full Screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[98] flex items-center justify-center"
            >
              <div className="w-full max-w-4xl px-8">
                {/* Navigation Items - Large Typography */}
                <nav className="space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const isHovered = hoveredItem === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                      >
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="block group"
                        >
                          <div className="flex items-baseline justify-between">
                            {/* Label */}
                            <motion.h2
                              className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight transition-all duration-300 ${
                                isActive
                                  ? 'text-white'
                                  : 'text-gray-600'
                              }`}
                              animate={{
                                x: isHovered ? 20 : 0,
                                color: isHovered ? '#FFFFFF' : isActive ? '#FFFFFF' : '#4B5563',
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.label}
                            </motion.h2>

                            {/* Index */}
                            <motion.span
                              className="text-sm md:text-base font-mono text-gray-600"
                              animate={{
                                opacity: isHovered ? 1 : 0.5,
                                x: isHovered ? -10 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </motion.span>
                          </div>

                          {/* Underline on Hover */}
                          <motion.div
                            className="h-[3px] bg-[#D42D1F] mt-2"
                            initial={{ scaleX: 0 }}
                            animate={{
                              scaleX: isHovered || isActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ transformOrigin: 'left' }}
                          />
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Bottom Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end text-sm font-mono text-gray-500"
                >
                  <div className="space-y-1 mb-6 md:mb-0">
                    <div>OPERATION: HACKATHON</div>
                    <div>MARCH 15-17, 2026</div>
                  </div>

                  <div className="flex space-x-6">
                    {['Instagram', 'LinkedIn', 'Twitter', 'GitHub'].map((social, idx) => (
                      <motion.a
                        key={social}
                        href={`#${social.toLowerCase()}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                        className="hover:text-white transition-colors"
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MinimalSideMenu;
