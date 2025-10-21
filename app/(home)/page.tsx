import FeaturedDishes from '@/components/FeaturedDishes'
import React from 'react'
import Hero from '@/components/Hero'

import OurStory from '@/components/OurStory'
import Testimonials from '@/components/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedDishes />
      <OurStory />
      <Testimonials />
    </div>
  )
}

export default Home