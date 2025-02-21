"use client"
import React, { useEffect, useState } from "react";
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaUtensils } from "react-icons/fa";

const ReservationSystem = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
  ];
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowConfirmation(true);
      }, 1500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fine Dining Restaurant</h1>
          <p className="text-lg text-gray-600">Reserve your table for an unforgettable dining experience</p>
        </div>

        {!showConfirmation ? (
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "name", label: "Guest Name", icon: FaUser, type: "text" },
                { id: "email", label: "Email Address", icon: FaEnvelope, type: "email" },
                { id: "phone", label: "Phone Number", icon: FaPhone, type: "tel" },
                { id: "guests", label: "Number of Guests", icon: FaUtensils, type: "number", min: "1", max: "10" },
              ].map(({ id, label, icon: Icon, ...rest }) => (
                <div key={id}>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                    <Icon className="inline mr-2" />
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    {...rest}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[id] ? "border-red-500" : ""}`}
                  />
                  {errors[id] && <p className="text-red-500 text-xs italic">{errors[id]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  <FaCalendar className="inline mr-2" />Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? "border-red-500" : ""}`}
                />
                {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                  <FaClock className="inline mr-2" />Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.time ? "border-red-500" : ""}`}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequests">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Any special requests or dietary requirements?"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
              >
                {isSubmitting ? "Processing..." : "Reserve Table"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reservation Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you for choosing our restaurant. We look forward to serving you!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationSystem;
