"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useReservationStore } from "@/store/reservationStore";

const Reservation: React.FC = () => {
  const { user } = useUser();
  const { filteredReservations, loading, error, fetchReservations, setFilter, filter } = useReservationStore();

  useEffect(() => {
    if (user) fetchReservations(user.id);
  }, [user]);

  if (!user) return <p className="text-center mt-20">Please sign in to view your reservations.</p>;
  if (loading) return <p className="text-center mt-20">Loading reservations...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (filteredReservations.length === 0) return <p className="text-center mt-20">No reservations found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Your Reservations</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["all", "upcoming", "previous"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full border ${
              filter === f ? "bg-amber-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setFilter(f as "all" | "upcoming" | "previous")}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredReservations.map((resv) => (
          <div key={resv._id} className="border p-4 rounded shadow-md">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Reservation ID:</span>
              <span>{resv._id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date & Time:</span>
              <span>{new Date(resv.date).toLocaleDateString()} at {resv.time}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Guests:</span>
              <span>{resv.guests}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Confirmed:</span>
              <span>{resv.isConfirmed ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Payment Status:</span>
              <span className={`capitalize ${resv.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                {resv.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Table ID:</span>
              <span>{resv.tableId}</span>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Booked on: {new Date(resv.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
