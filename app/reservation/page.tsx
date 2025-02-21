"use client"
import HeroSection from '@/components/about/HeroSection'
import Footer from '@/components/Footer'
import ReservationSystem from '@/components/ReservationSystem'
import React from 'react'

const page = () => {
  return (
    <div>
<HeroSection />
<ReservationSystem/>
<Footer />
    </div>
  )
}

export default page