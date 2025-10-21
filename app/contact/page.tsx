// // "use client"
// // import HeroSection from '@/components/about/HeroSection'

// // import React from 'react'
// // import ContactForm from "@/components/ContactForm"
// // const page = () => {
// //   return (
// //     <div>
// //         <HeroSection />
// // <ContactForm
// //   title="Contact Us"
// //   subjects={["General Inquiry", "Feedback", "Support"]}
// //   successMessage="Thank you for reaching out!"
// //   address="Booty More,Ranchi, Jharkhand"
// //   lat={23.35}
// //   lng={85.38}
// // />

        
// //     </div>
// //   )
// // }

// // export default page
// "use client";

// import HeroSection from "@/components/about/HeroSection";
// import Map from "@/components/Map";
// import ContactForm from "@/components/ContactForm";

// export default function ContactPage() {
//   return (
//     <div>
//       <HeroSection />
//       <ContactForm
//         title="Contact Us"
//         subjects={["General Inquiry", "Feedback", "Support"]}
//         successMessage="Thank you for reaching out!"
//         address="Booty More,Ranchi, Jharkhand"
//         lat={23.35}
//         lng={85.38}
//       />
//       <Map lat={23.35} lng={85.38} address="Booty More, Ranchi, Jharkhand" />
//     </div>
//   );
// }
'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/about/HeroSection';
import ContactForm from '@/components/ContactForm';

// Dynamically import Map component (client-only)
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ContactPage() {
  return (
    <div>
      <HeroSection />
      <ContactForm
        title="Contact Us"
        subjects={['General Inquiry', 'Feedback', 'Support']}
        successMessage="Thank you for reaching out!"
        address="Booty More, Ranchi, Jharkhand"
        lat={23.35}
        lng={85.38}
      />
      <Map lat={23.35} lng={85.38} address="Booty More, Ranchi, Jharkhand" />
    </div>
  );
}
