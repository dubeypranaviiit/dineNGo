"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import ReservationsTable from '@/components/ReservationTable';
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
    <div>
      <ReservationsTable />
    </div>
  )
}

export default Reservation;