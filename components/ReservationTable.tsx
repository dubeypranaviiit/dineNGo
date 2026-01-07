"use client";
import React from "react";
interface Reservation {
  _id: string;
  name: string;
  date: string;
  time: string;
  status: string;
}
interface ReservationsTableProps {
  reservations: Reservation[];
}
const ReservationsTable: React.FC<ReservationsTableProps> = ({ reservations }) => {
  if (!reservations?.length) {
    return <p className="text-center text-gray-500">No reservations found.</p>;
  }
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {reservations.map((r) => (
          <tr key={r._id}>
            <td className="px-6 py-4">{r.name}</td>
            <td className="px-6 py-4">{r.date}</td>
            <td className="px-6 py-4">{r.time}</td>
            <td className="px-6 py-4">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReservationsTable;
