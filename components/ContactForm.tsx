// // import Map from "./Map";

// // const ContactForm = ({ title, subjects, successMessage, address, lat, lng }) => {
// //   return (
// //     <div className="bg-white rounded-lg shadow-lg p-8">
// //       <h2 className="text-3xl font-bold text-amber-800 mb-6">{title}</h2>

// //       {/* Map Section */}
// //       <div className="mb-6">
// //         <Map lat={lat} lng={lng} address={address} />
// //         <p className="text-gray-700 mt-2 text-sm">{address}</p>
// //       </div>

  
// //     </div>
// //   );
// // };

// // export default ContactForm
// "use client";

// import React from "react";
// import Map from "./Map";

// interface ContactFormProps {
//   title: string;
//   subjects: string[];
//   successMessage: string;
//   address: string;
//   lat: number;
//   lng: number;
// }

// const ContactForm: React.FC<ContactFormProps> = ({ title, subjects, successMessage, address, lat, lng }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-8">
//       <h2 className="text-3xl font-bold text-amber-800 mb-6">{title}</h2>

//       {/* Form */}
//       <form className="space-y-4">
//         <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
//         <input type="email" placeholder="Your Email" className="w-full p-3 border rounded" />
//         <select className="w-full p-3 border rounded">
//           {subjects.map((subject) => (
//             <option key={subject}>{subject}</option>
//           ))}
//         </select>
//         <textarea placeholder="Message" className="w-full p-3 border rounded" rows={4}></textarea>
//         <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded">
//           Submit
//         </button>
//       </form>

//       {/* Map */}
//       <div className="mt-6">
//         <Map lat={lat} lng={lng} address={address} />
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Map = dynamic(() => import('./Map'), { ssr: false });

interface ContactFormProps {
  title: string;
  subjects: string[];
  successMessage: string;
  address: string;
  lat: number;
  lng: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subjects,
  successMessage,
  address,
  lat,
  lng,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-amber-800 mb-6">{title}</h2>

      {/* Form */}
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded" />
        <select className="w-full p-3 border rounded">
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
        <textarea placeholder="Message" className="w-full p-3 border rounded" rows={4}></textarea>
        <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded">
          Submit
        </button>
      </form>

      {/* Map */}
      <div className="mt-6">
        <Map lat={lat} lng={lng} address={address} />
      </div>
    </div>
  );
};

export default ContactForm;
