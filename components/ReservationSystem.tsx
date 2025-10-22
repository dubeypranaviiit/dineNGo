// // // "use client"
// // // import React, { useEffect, useState } from "react";
// // // import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaUtensils } from "react-icons/fa";
// // // import axios from "axios";
// // // import ReservationsTable from "./ReservationTable";
// // // interface Reservation {
// // //   name: string;
// // //   email: string;
// // //   phone: number;
// // //   date: string;
// // //   time: string;
// // //   guests: number;
// // //   specialRequests?: string;
// // // }


// // // const ReservationSystem = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     date: "",
// // //     time: "",
// // //     guests: 1,
// // //     specialRequests: "",
// // //   });
// // //   // const [reservations,setReservations]= useState([])
// // //   const [reservations, setReservations] = useState<Reservation[]>([]);
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [showConfirmation, setShowConfirmation] = useState(false);
// // //   const timeSlots = [
// // //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
// // //     "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
// // //     "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
// // //     "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
// // //   ];
// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!formData.name.trim()) newErrors.name = "Name is required";
// // //     if (!formData.email.trim()) {
// // //       newErrors.email = "Email is required";
// // //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// // //       newErrors.email = "Invalid email format";
// // //     }
// // //     if (!formData.phone.trim()) {
// // //       newErrors.phone = "Phone number is required";
// // //     } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
// // //       newErrors.phone = "Invalid phone number";
// // //     }
// // //     if (!formData.date) newErrors.date = "Date is required";
// // //     if (!formData.time) newErrors.time = "Time is required";
// // //     if (formData.guests < 1 || formData.guests > 10) {
// // //       newErrors.guests = "Number of guests must be between 1 and 10";
// // //     }
// // //     return newErrors;
// // //   };

// // //   // const handleSubmit = (e) => {
// // //   //   e.preventDefault();
// // //   //   const validationErrors = validateForm();
// // //   //   setErrors(validationErrors);

// // //   //   if (Object.keys(validationErrors).length === 0) {
// // //   //     setIsSubmitting(true);
// // //   //     setTimeout(() => {
// // //   //       setIsSubmitting(false);
// // //   //       setShowConfirmation(true);
// // //   //     }, 1500);
// // //   //   }
// // //   // };
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
  
// // //     const validationErrors = validateForm();
// // //     setErrors(validationErrors);
  
// // //     if (Object.keys(validationErrors).length === 0) {
// // //       setIsSubmitting(true);
  
// // //       try {
// // //         const response = await axios.post("/api/reservation", formData);
  
// // //         if (response.data.success) {
// // //           if (Array.isArray(response.data.reservation)) {
// // //             setReservations(response.data.reservation);
// // //           } else {
// // //             setReservations([response.data.reservation]); // Ensure it's an array
// // //           }
// // //           setShowConfirmation(true);
// // //           setIsSubmitting(false);
// // //           setFormData({
// // //             name: "",
// // //             email: "",
// // //             phone: "",
// // //             date: "",
// // //             time: "",
// // //             guests: 1,
// // //             specialRequests: "",
// // //           });
// // //         } else {
// // //           alert(response.data.message);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error submitting form:", error);
// // //         alert("Failed to submit reservation. Please try again.");
// // //       } finally {
// // //         setIsSubmitting(false);
// // //       }
// // //     }
// // //   };
  
  
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };
// // //    useEffect(()=>{
// // //    console.log(reservations);
// // //    },[reservations])
// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="text-center mb-12">
// // //           <h1 className="text-4xl font-bold text-gray-900 mb-4">Fine Dining Restaurant</h1>
// // //           <p className="text-lg text-gray-600">Reserve your table for an unforgettable dining experience</p>
// // //         </div>

// // //         {!showConfirmation ? (
// // //           <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {[
// // //                 { id: "name", label: "Guest Name", icon: FaUser, type: "text" },
// // //                 { id: "email", label: "Email Address", icon: FaEnvelope, type: "email" },
// // //                 { id: "phone", label: "Phone Number", icon: FaPhone, type: "tel" },
// // //                 { id: "guests", label: "Number of Guests", icon: FaUtensils, type: "number", min: "1", max: "10" },
// // //               ].map(({ id, label, icon: Icon, ...rest }) => (
// // //                 <div key={id}>
// // //                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
// // //                     <Icon className="inline mr-2" />
// // //                     {label}
// // //                   </label>
// // //                   <input
// // //                     id={id}
// // //                     name={id}
// // //                     value={formData[id]}
// // //                     onChange={handleInputChange}
// // //                     {...rest}
// // //                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[id] ? "border-red-500" : ""}`}
// // //                   />
// // //                   {errors[id] && <p className="text-red-500 text-xs italic">{errors[id]}</p>}
// // //                 </div>
// // //               ))}

// // //               <div>
// // //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
// // //                   <FaCalendar className="inline mr-2" />Date
// // //                 </label>
// // //                 <input
// // //                   type="date"
// // //                   id="date"
// // //                   name="date"
// // //                   min={new Date().toISOString().split("T")[0]}
// // //                   value={formData.date}
// // //                   onChange={handleInputChange}
// // //                   className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? "border-red-500" : ""}`}
// // //                 />
// // //                 {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
// // //               </div>

// // //               <div>
// // //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
// // //                   <FaClock className="inline mr-2" />Time
// // //                 </label>
// // //                 <select
// // //                   id="time"
// // //                   name="time"
// // //                   value={formData.time}
// // //                   onChange={handleInputChange}
// // //                   className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.time ? "border-red-500" : ""}`}
// // //                 >
// // //                   <option value="">Select a time</option>
// // //                   {timeSlots.map((slot) => (
// // //                     <option key={slot} value={slot}>
// // //                       {slot}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
// // //               </div>
// // //             </div>

// // //             <div className="mt-6">
// // //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequests">
// // //                 Special Requests (Optional)
// // //               </label>
// // //               <textarea
// // //                 id="specialRequests"
// // //                 name="specialRequests"
// // //                 value={formData.specialRequests}
// // //                 onChange={handleInputChange}
// // //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
// // //                 placeholder="Any special requests or dietary requirements?"
// // //               />
// // //             </div>

// // //             <div className="mt-8 flex justify-center">
// // //               <button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
// // //               >
// // //                 {isSubmitting ? "Processing..." : "Reserve Table"}
// // //               </button>
// // //             </div>
// // //           </form>
// // //         ) : (
// // //           <div className="bg-white shadow-xl rounded-lg p-8 text-center">
// // //             <h2 className="text-2xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h2>
// // //             <p className="text-gray-600 mb-6">Thank you for choosing our restaurant. We look forward to serving you!</p>
// // //           </div>
// // //         )}
// // //         {/* <div className="mt-12 bg-white shadow-xl rounded-lg p-8">
// // //           <h2 className="text-xl font-bold text-gray-900 mb-4">Your Reservations</h2>
// // //           {reservations.map((reservations, index) => (
// // //             <div key={index} className="p-4 border-b border-gray-200">
// // //               <p><strong>{reservations.name}</strong> - {reservations.date} at {reservations.time} ({reservations.guests} guests)</p>
// // //             </div>
// // //           ))}
// // //         </div> */}
// // //         <ReservationsTable  /> 
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ReservationSystem;
// // // "use client"
// // // import React, { useEffect, useState } from "react";
// // // import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaUtensils } from "react-icons/fa";
// // // import axios from "axios";
// // // import { loadStripe } from "@stripe/stripe-js";

// // // interface Table {
// // //   _id: string;
// // //   number: number;
// // //   seats: number;
// // //   status: string;
// // //   location?: { window?: string; area?: string; section?: string };
// // // }

// // // interface Reservation {
// // //   name: string;
// // //   email: string;
// // //   phone: string;
// // //   date: string;
// // //   time: string;
// // //   guests: number;
// // //   tableId?: string;
// // //   specialRequests?: string;
// // // }

// // // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// // // const ReservationSystem = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     date: "",
// // //     time: "",
// // //     guests: 1,
// // //     tableId: "",
// // //     specialRequests: "",
// // //   });
// // //   const [tables, setTables] = useState<Table[]>([]);
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [showConfirmation, setShowConfirmation] = useState(false);

// // //   const timeSlots = [
// // //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
// // //     "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
// // //     "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
// // //     "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
// // //   ];

// // //   // Fetch tables from backend
// // //   useEffect(() => {
// // //     axios.get("/api/tables").then((res) => {
// // //       setTables(res.data.tables);
// // //     });
// // //   }, []);

// // //   const validateForm = () => {
// // //     const newErrors: any = {};
// // //     if (!formData.name.trim()) newErrors.name = "Name is required";
// // //     if (!formData.email.trim()) newErrors.email = "Email is required";
// // //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
// // //     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
// // //     else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) newErrors.phone = "Invalid phone number";
// // //     if (!formData.date) newErrors.date = "Date is required";
// // //     if (!formData.time) newErrors.time = "Time is required";
// // //     if (formData.guests < 1 || formData.guests > 10) newErrors.guests = "Guests must be between 1-10";
// // //     return newErrors;
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     const validationErrors = validateForm();
// // //     setErrors(validationErrors);
// // //     if (Object.keys(validationErrors).length > 0) return;

// // //     setIsSubmitting(true);
// // //     try {
// // //       // Call API to create reservation + payment
// // //       const res = await axios.post("/api/reservation", formData);
// // //       if (res.data.paymentUrl) {
// // //         // Redirect to Stripe Checkout
// // //         const stripe = await stripePromise;
// // //         await stripe?.redirectToCheckout({ sessionId: res.data.paymentUrl });
// // //       } else {
// // //         setShowConfirmation(true);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to create reservation");
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-4xl mx-auto">
// // //         <div className="text-center mb-12">
// // //           <h1 className="text-4xl font-bold text-gray-900 mb-4">Fine Dining Restaurant</h1>
// // //           <p className="text-lg text-gray-600">Reserve your table for an unforgettable dining experience</p>
// // //         </div>

// // //         {!showConfirmation ? (
// // //           <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {[
// // //                 { id: "name", label: "Guest Name", icon: FaUser, type: "text" },
// // //                 { id: "email", label: "Email Address", icon: FaEnvelope, type: "email" },
// // //                 { id: "phone", label: "Phone Number", icon: FaPhone, type: "tel" },
// // //                 { id: "guests", label: "Number of Guests", icon: FaUtensils, type: "number", min: 1, max: 10 },
// // //               ].map(({ id, label, icon: Icon, ...rest }) => (
// // //                 <div key={id}>
// // //                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
// // //                     <Icon className="inline mr-2" />
// // //                     {label}
// // //                   </label>
// // //                   <input
// // //                     id={id}
// // //                     name={id}
// // //                     value={formData[id as keyof typeof formData]}
// // //                     onChange={handleInputChange}
// // //                     {...rest}
// // //                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[id] ? "border-red-500" : ""}`}
// // //                   />
// // //                   {errors[id] && <p className="text-red-500 text-xs italic">{errors[id]}</p>}
// // //                 </div>
// // //               ))}

// // //               <div>
// // //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
// // //                   <FaCalendar className="inline mr-2" />Date
// // //                 </label>
// // //                 <input type="date" id="date" name="date" min={new Date().toISOString().split("T")[0]} value={formData.date} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${errors.date ? "border-red-500" : ""}`} />
// // //                 {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
// // //               </div>

// // //               <div>
// // //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
// // //                   <FaClock className="inline mr-2" />Time
// // //                 </label>
// // //                 <select id="time" name="time" value={formData.time} onChange={handleInputChange} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${errors.time ? "border-red-500" : ""}`}>
// // //                   <option value="">Select a time</option>
// // //                   {timeSlots.map((slot) => (
// // //                     <option key={slot} value={slot}>{slot}</option>
// // //                   ))}
// // //                 </select>
// // //                 {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
// // //               </div>

// // //               <div>
// // //                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableId">
// // //                   Table (Optional)
// // //                 </label>
// // //                 <select id="tableId" name="tableId" value={formData.tableId} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
// // //                   <option value="">Auto-assign</option>
// // //                   {tables.map((t) => (
// // //                     <option key={t._id} value={t._id}>
// // //                       Table {t.number} - {t.seats} seats {t.location?.area ? `(${t.location.area})` : ""}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <div className="mt-6">
// // //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequests">
// // //                 Special Requests (Optional)
// // //               </label>
// // //               <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32" placeholder="Any special requests or dietary requirements?" />
// // //             </div>

// // //             <div className="mt-8 flex justify-center">
// // //               <button type="submit" disabled={isSubmitting} className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}>
// // //                 {isSubmitting ? "Processing..." : "Reserve & Pay"}
// // //               </button>
// // //             </div>
// // //           </form>
// // //         ) : (
// // //           <div className="bg-white shadow-xl rounded-lg p-8 text-center">
// // //             <h2 className="text-2xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h2>
// // //             <p className="text-gray-600 mb-6">Thank you! Check your email for details.</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ReservationSystem;

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaCalendar,
// //   FaClock,
// //   FaUtensils,
// // } from "react-icons/fa";

// // const ReservationSystem = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     date: "",
// //     time: "",
// //     guests: 1,
// //     tableId: "",
// //   });
// //   const [tables, setTables] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     axios.get("/api/tables").then((res) => setTables(res.data.tables));
// //   }, []);

// //   const handleChange = (e: any) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const res = await axios.post("/api/reservation", formData);
// //       const { paymentUrl } = res.data;

// //       if (!paymentUrl) throw new Error("No payment URL received");
// //       window.location.href = paymentUrl; // redirect to Stripe Checkout
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.error || err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-6"
// //       >
// //         <h1 className="text-2xl font-bold text-center">Reserve Your Table</h1>
// //         {error && <p className="text-red-600">{error}</p>}

// //         <Input name="name" label="Name" icon={<FaUser />} value={formData.name} onChange={handleChange} />
// //         <Input name="email" label="Email" icon={<FaEnvelope />} value={formData.email} onChange={handleChange} />
// //         <Input name="phone" label="Phone" icon={<FaPhone />} value={formData.phone} onChange={handleChange} />
// //         <Input name="guests" label="Guests" icon={<FaUtensils />} type="number" value={formData.guests} onChange={handleChange} />

// //         <Input name="date" label="Date" icon={<FaCalendar />} type="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
// //         <select name="time" value={formData.time} onChange={handleChange} required className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300">
// //           <option value="">Select time</option>
// //           {["11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM"].map(t => <option key={t}>{t}</option>)}
// //         </select>

// //         <select name="tableId" value={formData.tableId} onChange={handleChange} className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300">
// //           <option value="">Auto assign</option>
// //           {tables.map((t: any) => (
// //             <option key={t._id} value={t._id}>
// //               Table {t.number} ({t.seats} seats)
// //             </option>
// //           ))}
// //         </select>

// //         <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg">
// //           {loading ? "Processing..." : "Pay & Reserve"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // const Input = ({ label, icon, ...props }: any) => (
// //   <div>
// //     <label className="block text-gray-700 font-semibold mb-1">{icon} {label}</label>
// //     <input {...props} className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300" required />
// //   </div>
// // );

// // export default ReservationSystem;
// // "use client";
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { loadStripe } from "@stripe/stripe-js";
// // import {
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaCalendar,
// //   FaClock,
// //   FaUtensils,
// // } from "react-icons/fa";

// // interface Table {
// //   _id: string;
// //   number: number;
// //   seats: number;
// //   status: string;
// //   location?: { area?: string; section?: string };
// // }

// // interface FormData {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   date: string;
// //   time: string;
// //   guests: number;
// //   tableId: string;
// // }

// // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// // const ReservationSystem = () => {
// //   const [tables, setTables] = useState<Table[]>([]);
// //   const [formData, setFormData] = useState<FormData>({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     date: "",
// //     time: "",
// //     guests: 1,
// //     tableId: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [showConfirmation, setShowConfirmation] = useState(false);

// //   const timeSlots = [
// //     "11:00 AM",
// //     "11:30 AM",
// //     "12:00 PM",
// //     "12:30 PM",
// //     "1:00 PM",
// //     "1:30 PM",
// //     "2:00 PM",
// //     "2:30 PM",
// //     "5:00 PM",
// //     "5:30 PM",
// //     "6:00 PM",
// //     "6:30 PM",
// //     "7:00 PM",
// //     "7:30 PM",
// //     "8:00 PM",
// //     "8:30 PM",
// //   ];

// //   useEffect(() => {
// //     axios
// //       .get("/api/tables")
// //       .then((res) => setTables(res.data.tables))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const validateForm = () => {
// //     const newErrors: any = {};
// //     if (!formData.name.trim()) newErrors.name = "Name is required";
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
// //     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
// //     else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) newErrors.phone = "Invalid phone number";
// //     if (!formData.date) newErrors.date = "Date is required";
// //     if (!formData.time) newErrors.time = "Time is required";
// //     if (formData.guests < 1 || formData.guests > 10) newErrors.guests = "Guests must be between 1-10";
// //     return newErrors;
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     const validationErrors = validateForm();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setError(Object.values(validationErrors).join(", "));
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // Call API to create Stripe session
// //       const res = await axios.post("/api/reservation", formData);
// //       const { sessionId } = res.data;

// //       if (sessionId) {
// //         const stripe = await stripePromise;
// //         await stripe?.redirectToCheckout({ sessionId });
// //       } else {
// //         setError("Failed to create payment session");
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err.response?.data?.error || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-4">
// //       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
// //         <h1 className="text-3xl font-bold text-center mb-6">Reserve Your Table</h1>
// //         <p className="text-gray-600 text-center mb-10">
// //           Secure your reservation with a ₹500 booking fee.
// //         </p>

// //         {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">{error}</div>}

// //         {!showConfirmation ? (
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Name */}
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaUser className="inline mr-2" /> Name
// //                 </label>
// //                 <input
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 />
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaEnvelope className="inline mr-2" /> Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 />
// //               </div>

// //               {/* Phone */}
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaPhone className="inline mr-2" /> Phone
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 />
// //               </div>

// //               {/* Guests */}
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaUtensils className="inline mr-2" /> Guests
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="guests"
// //                   value={formData.guests}
// //                   onChange={handleChange}
// //                   min={1}
// //                   max={10}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 />
// //               </div>
// //             </div>

// //             {/* Date & Time */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaCalendar className="inline mr-2" /> Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   name="date"
// //                   min={new Date().toISOString().split("T")[0]}
// //                   value={formData.date}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-1">
// //                   <FaClock className="inline mr-2" /> Time
// //                 </label>
// //                 <select
// //                   name="time"
// //                   value={formData.time}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //                 >
// //                   <option value="">Select a time</option>
// //                   {timeSlots.map((t) => (
// //                     <option key={t}>{t}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Table selection */}
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-1">Table (optional)</label>
// //               <select
// //                 name="tableId"
// //                 value={formData.tableId}
// //                 onChange={handleChange}
// //                 className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
// //               >
// //                 <option value="">Auto assign</option>
// //                 {tables.map((t) => (
// //                   <option key={t._id} value={t._id}>
// //                     Table {t.number} ({t.seats} seats){t.location?.area ? ` - ${t.location.area}` : ""}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Submit */}
// //             <div className="pt-6 text-center">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all ${
// //                   loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
// //                 }`}
// //               >
// //                 {loading ? "Processing..." : "Pay & Reserve"}
// //               </button>
// //             </div>
// //           </form>
// //         ) : (
// //           <div className="bg-white shadow-xl rounded-lg p-8 text-center">
// //             <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
// //             <p>Your table is booked for 1 hour. Check your email for details.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReservationSystem;
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaCalendar,
//   FaClock,
//   FaUtensils,
// } from "react-icons/fa";

// interface Table {
//   _id: string;
//   number: number;
//   seats: number;
//   status: string;
// }

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   date: string;
//   time: string;
//   guests: number;
//   tableId?: string;
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// const ReservationSystem = () => {
//   const [tables, setTables] = useState<Table[]>([]);
//   const [availableTimes, setAvailableTimes] = useState<string[]>([]);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     guests: 1,
//     tableId: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch tables on mount
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const res = await axios.get("/api/tables");
//         setTables(res.data.tables);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTables();
//   }, []);

//   // Fetch available times whenever date or table changes
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       if (!formData.date) return;

//       try {
//         const res = await axios.get("/api/tables/availability", {
//           params: {
//             date: formData.date,
//             tableId: formData.tableId || undefined,
//           },
//         });
//         setAvailableTimes(res.data.availableTimes || []);
//       } catch (err) {
//         console.error(err);
//         setAvailableTimes([]);
//       }
//     };
//     fetchAvailability();
//   }, [formData.date, formData.tableId]);

// useEffect(() => {
//   const fetchAvailability = async () => {
//     if (!formData.date) return;

//     try {
//       const res = await axios.get("/api/tables/availability", {
//         params: {
//           date: formData.date,
//           guests: formData.guests,
//           tableId: formData.tableId || undefined,
//         },
//       });
//       setTables(res.data.tables || []);
//       setAvailableTimes(res.data.availableTimes || []);
//     } catch (err) {
//       console.error(err);
//       setAvailableTimes([]);
//     }
//   };
//   fetchAvailability();
// }, [formData.date, formData.tableId, formData.guests]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setLoading(true);

//   //   try {
//   //     const res = await axios.post("/api/reservation", formData);
//   //     const { sessionId } = res.data;
        
//   //   if (!sessionId) throw new Error("No session ID returned from server");
//   //  console.log(sessionId);
//   //     if (sessionId) {
//   //       // const stripe = await stripePromise;
//   //       window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
//   //     }
//   //   } catch (err: any) {
//   //     console.error(err);
//   //     setError(err.response?.data?.error || "Something went wrong");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     const res = await axios.post("/api/reservation", formData);
//     const { url } = res.data;

//     if (!url) throw new Error("No checkout URL returned");

//     window.location.href = url; // Redirect to Stripe Checkout
//   } catch (err: any) {
//     console.error("Payment error:", err);
//     setError(err.message || "Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <h1 className="text-3xl font-bold text-center mb-6">Reserve Your Table</h1>
//         <p className="text-gray-600 text-center mb-10">
//           Secure your reservation with a ₹500 booking fee.
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaUser className="inline mr-2" /> Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaEnvelope className="inline mr-2" /> Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaPhone className="inline mr-2" /> Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaCalendar className="inline mr-2" /> Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               min={new Date().toISOString().split("T")[0]}
//               value={formData.date}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           {/* Guests */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaUtensils className="inline mr-2" /> Guests
//             </label>
//             <input
//               type="number"
//               name="guests"
//               min={1}
//               max={30}
//               value={formData.guests}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             />
//           </div>

//           {/* Table Selection */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Table (optional)
//             </label>
//             <select
//               name="tableId"
//               value={formData.tableId}
//               onChange={handleChange}
//               className="w-full border rounded-md p-2"
//             >
//               <option value="">Auto assign</option>
//               {tables.map((t) => (
//                 <option key={t._id} value={t._id}>
//                   Table {t.number} ({t.seats} seats)
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Time Selection */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               <FaClock className="inline mr-2" /> Time
//             </label>
//             <select
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             >
//               <option value="">Select Time</option>
//               {availableTimes.length > 0 ? (
//                 availableTimes.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No slots available</option>
//               )}
//             </select>
//           </div>

//           {/* Submit */}
//           <div className="pt-6 text-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all ${
//                 loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
//               }`}
//             >
//               {loading ? "Processing..." : "Pay & Reserve"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReservationSystem;
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser, FaPhone, FaEnvelope, FaCalendar, FaClock, FaUtensils
} from "react-icons/fa";

interface Table {
  _id: string;
  number: number;
  seats: number;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId?: string;
}

const ReservationSystem = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    tableId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Fetch availability when date or guests change
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!formData.date) return;
      try {
        const res = await axios.get("/api/tables/availability", {
          params: {
            date: formData.date,
            guests: formData.guests,
          },
        });
        setTables(res.data.availableTables || []);
        setAvailableTimes(res.data.availableTimes || []);
      } catch (err) {
        console.error("Availability fetch error:", err);
        setTables([]);
        setAvailableTimes([]);
      }
    };
    fetchAvailability();
  }, [formData.date, formData.guests]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💳 Submit reservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/reservation", formData);
      const { url } = res.data;
      if (!url) throw new Error("Payment session not found");
      window.location.href = url;
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Reserve Your Table</h1>
        <p className="text-gray-600 text-center mb-8">
          Secure your reservation with a ₹500 booking fee.
        </p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaUser className="inline mr-2" /> Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaEnvelope className="inline mr-2" /> Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaPhone className="inline mr-2" /> Phone</label>
            <input name="phone" type="text" value={formData.phone} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaCalendar className="inline mr-2" /> Date</label>
            <input name="date" type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaUtensils className="inline mr-2" /> Guests</label>
            <input name="guests" type="number" min={1} max={30}
              value={formData.guests} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          {/* Table */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Table (optional)</label>
            <select name="tableId" value={formData.tableId} onChange={handleChange}
              className="w-full border rounded-md p-2">
              <option value="">Auto assign</option>
              {tables.map((t) => (
                <option key={t._id} value={t._id}>
                  Table {t.number} ({t.seats} seats)
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaClock className="inline mr-2" /> Time</label>
            <select name="time" value={formData.time} onChange={handleChange}
              required className="w-full border rounded-md p-2"
              disabled={!availableTimes.length}>
              <option value="">Select Time</option>
              {availableTimes.length > 0 ? (
                availableTimes.map((t) => <option key={t} value={t}>{t}</option>)
              ) : (
                <option disabled>No slots available</option>
              )}
            </select>
          </div>

          {/* Submit */}
          <div className="pt-6 text-center">
            <button type="submit" disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}>
              {loading ? "Processing..." : "Pay & Reserve"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationSystem;
