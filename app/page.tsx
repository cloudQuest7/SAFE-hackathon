import React from 'react'
import HeroSection from '@/components/hero/page'
import Hero from '@/components/hero/HeroSection'
import AboutSection from '@/components/about/AboutSection'
import HackathonInfoSection from '@/components/ps/HackathonInfoSection'
import ProblemsSection from '@/components/ps/ProblemsSection'
import TimelineSection from '@/components/timeline/TimelineSection'
import PrizesSection from '@/components/prizes/PrizesSection'
import Faq from '@/components/faq/faq'
import Footer from '@/components/footer'


const Landing = () => {
  return (
    <div className="bg-black">
      <HeroSection />
      <Hero />
      <AboutSection />
      <HackathonInfoSection />
      <ProblemsSection />
      <TimelineSection />
      <PrizesSection />
      <Faq />
      <Footer />
    </div>
  )
}

export default Landing