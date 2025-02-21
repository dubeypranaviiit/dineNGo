import FeaturedDishes from '@/components/FeaturedDishes'
import React from 'react'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import OurStory from '@/components/OurStory'
// import Testimonials from '@/components/Testimonials'
import Header from '@/components/Header'
const Home = () => {
  return (
    <div>
      {/* <Header /> */}
      <Hero/>
      <FeaturedDishes />
      <OurStory />
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}

export default Home