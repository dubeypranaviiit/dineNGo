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
        
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaUser className="inline mr-2" /> Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaEnvelope className="inline mr-2" /> Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>

  
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaPhone className="inline mr-2" /> Phone</label>
            <input name="phone" type="text" value={formData.phone} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaCalendar className="inline mr-2" /> Date</label>
            <input name="date" type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1"><FaUtensils className="inline mr-2" /> Guests</label>
            <input name="guests" type="number" min={1} max={30}
              value={formData.guests} onChange={handleChange}
              required className="w-full border rounded-md p-2" />
          </div>
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
