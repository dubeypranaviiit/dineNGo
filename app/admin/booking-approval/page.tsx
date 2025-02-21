"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios';
const Reservation = () => {
  const [reservations,setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBookingData = async () => {
      try {
        const res = await axios.get("/api/reservation");
        setReservations(res.data.reservationData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookingData();
  }, []);
  return (
    <div>page</div>
  )
}

export default Reservation;