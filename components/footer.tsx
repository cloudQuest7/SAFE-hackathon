'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  ChevronUp,
  Shield,
  Code,
  Cpu,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Add your newsletter subscription logic here
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Register', href: '#register' },
    { name: 'Problem Statements', href: '#problems' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Code of Conduct', href: '#conduct' },
    { name: 'Past Events', href: '#past-events' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/icell', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/icell', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/icell', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/icell', label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'hackathon@icell.edu', href: 'mailto:hackathon@icell.edu' },
    { icon: Phone, text: '+91-XXXX-XXXXXX', href: 'tel:+91XXXXXXXXXX' },
    { icon: MapPin, text: 'Your University, City', href: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative bg-[#1E2F23] text-gray-300 overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D42D1F] to-transparent"></div>

      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon
                points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                fill="none"
                stroke="#768948"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="pt-16 pb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: About & Contact */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-8 h-8 text-[#D42D1F]" />
                  <span className="text-2xl font-bold text-white font-['Rajdhani'] tracking-wider">
                    I-CELL
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Innovation Cell organizing the ultimate defence-themed hackathon. Deploy your skills, build tactical solutions.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#768948] uppercase tracking-wider mb-3">
                  Mission Control
                </h4>
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-sm hover:text-[#D42D1F] transition-colors group"
                  >
                    <item.icon className="w-4 h-4 text-gray-500 group-hover:text-[#D42D1F] transition-colors" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xs font-semibold text-[#768948] uppercase tracking-wider">
                Quick Access
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-[#D42D1F] transition-colors flex items-center group"
                    >
                      <span className="w-0 h-[1px] bg-[#D42D1F] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Hackathon Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xs font-semibold text-[#768948] uppercase tracking-wider">
                Mission Brief
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-[#D42D1F] mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-white">Software Track</p>
                    <p className="text-xs text-gray-400">AI, Security, Optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Cpu className="w-5 h-5 text-[#D42D1F] mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-white">Hardware Track</p>
                    <p className="text-xs text-gray-400">IoT, Robotics, Sensors</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Duration</p>
                  <p className="text-lg font-bold text-white font-['Rajdhani']">48 HOURS</p>
                </div>
              </div>
            </motion.div>

            {/* Column 4: Newsletter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-[#768948] uppercase tracking-wider mb-2">
                  Stay Briefed
                </h4>
                <p className="text-sm text-gray-400">
                  Get tactical updates on hackathon announcements.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#D42D1F] transition-colors font-['JetBrains_Mono'] placeholder-gray-600"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    }}
                  />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#D42D1F] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                </div>

                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="w-full px-4 py-3 bg-[#D42D1F] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#B02418] transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                  }}
                >
                  {isSubscribed ? (
                    <span>✓ SUBSCRIBED</span>
                  ) : (
                    <>
                      <span>Deploy</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-xs font-semibold text-[#768948] uppercase tracking-wider mb-3">
                  Connect
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#D42D1F] hover:bg-[#D42D1F]/10 transition-all group"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                      }}
                    >
                      <social.icon className="w-4 h-4 text-gray-400 group-hover:text-[#D42D1F] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-500">
              <p>&copy; 2026 I-Cell. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="#privacy" className="hover:text-[#D42D1F] transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#terms" className="hover:text-[#D42D1F] transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span className="font-['JetBrains_Mono']">Built with</span>
              <span className="text-[#D42D1F] animate-pulse">❤</span>
              <span className="font-['JetBrains_Mono']">by I-Cell Team</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#D42D1F] text-white flex items-center justify-center hover:bg-[#B02418] transition-all shadow-lg group z-50"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </motion.button>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D42D1F]/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;