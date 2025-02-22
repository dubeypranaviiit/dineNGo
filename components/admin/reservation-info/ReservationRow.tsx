import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  date: string;
  time: string;
  approvedBy:string;
}

interface ReservationRowProps {
  reservation: Reservation;
  handleEdit: (reservation: Reservation) => void;
  handleDelete: (id: string) => void;
}

const ReservationRow: React.FC<ReservationRowProps> = ({ reservation, handleEdit, handleDelete }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">{reservation.name}</td>
      <td className="px-6 py-4">{reservation.date}</td>
      <td className="px-6 py-4">{reservation.time}</td>
      <td className="px-6 py-4">{reservation.email}</td>
      <td className="px-6 py-4">{reservation.phone}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-white ${
            reservation.status === "confirmed"
              ? "bg-green-500"
              : reservation.status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {reservation.status}
        </span>
      </td>
      <td className="px-6 py-4 flex space-x-3">
        <button onClick={() => handleEdit(reservation)} className="text-blue-600 hover:text-blue-800">
          <FiEdit2 />
        </button>
        <button onClick={() => handleDelete(reservation.id)} className="text-red-600 hover:text-red-800">
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default ReservationRow;
