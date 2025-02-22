"use client"
import HeroSection from '@/components/about/HeroSection'
import Footer from '@/components/Footer'
import React from 'react'
import ContactForm from "@/components/ContactForm"
const page = () => {
  return (
    <div>
        <HeroSection />
<ContactForm
  title="Contact Us"
  subjects={["General Inquiry", "Feedback", "Support"]}
  successMessage="Thank you for reaching out!"
  address="Booty More,Ranchi, Jharkhand"
  lat={23.35}
  lng={85.38}
/>

        <Footer />
    </div>
  )
}

export default page