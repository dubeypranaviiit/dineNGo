
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservationsTable from "@/components/ReservationTable";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const res = await axios.get("/api/reservations");
        if (res.data.success) {
          setReservations(res.data.reservationData);
        } else {
          console.error("Failed to fetch reservation data");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookingData();
  }, []);

  if (loading) {
    return <p className="text-center py-8 text-gray-600">Loading reservations...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Reservations</h1>
      <ReservationsTable reservations={reservations} />
    </div>
  );
};

export default Reservation;
