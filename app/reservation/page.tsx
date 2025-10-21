"use client"
import HeroSection from '@/components/about/HeroSection'

import Header from '@/components/Header'
import Reservation from '@/components/Reservation'
import ReservationSystem from '@/components/ReservationSystem'
import React from 'react'

const page = () => {
  return (
    <div>
<Header />
<HeroSection />
<ReservationSystem/>
<Reservation />
    </div>
  )
}

export default page