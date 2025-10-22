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
"use client";
// import dynamic from "next/dynamic";
import React, { useState } from "react";

// const Map = dynamic(() => import("./Map"), { ssr: false });

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjects[0] || "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      setStatus(successMessage);
      setFormData({ name: "", email: "", subject: subjects[0], message: "" });
    } catch (error: any) {
      setStatus(error.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-amber-800 mb-6">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows={4}
          required
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-800 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {status && <p className="mt-4 text-green-700">{status}</p>}

      {/* <div className="mt-6">
        <Map lat={lat} lng={lng} address={address} />
      </div> */}
    </div>
  );
};

export default ContactForm;

