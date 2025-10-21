"use client"
import ChefIntro from '@/components/about/ChefIntro'
import HeroSection from '@/components/about/HeroSection'
import Milestone from '@/components/about/MileStone'
import TeamSection from '@/components/about/TeamSection'

import React from 'react'

const About = () => {
  return (
    <div>
        <HeroSection />
        <Milestone />
        <ChefIntro />
        <TeamSection />
        
    </div>
  )
}

export default About