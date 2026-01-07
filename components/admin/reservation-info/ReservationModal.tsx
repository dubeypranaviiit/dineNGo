'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import { Reservation } from "./types";

interface ReservationModalProps {
  reservation: Reservation | null;
  onClose: () => void;
}

const statusOptions = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
];

const ReservationModal: React.FC<ReservationModalProps> = ({ reservation, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    approvedBy: "",
    status: "",
  });

  useEffect(() => {
    if (reservation) {
      setFormData({
        approvedBy: reservation.approvedBy || "",
        status: reservation.status,
      });
    }
  }, [reservation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reservation?.id) return;

    setLoading(true);
    try {
      const isConfirmed = formData.status === "confirmed";

      const response = await axios.put(
        "/api/reservations",
        {
          reservationId: reservation.id,
          isConfirmed,
          approvedBy: formData.approvedBy,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("Reservation updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update reservation.");
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!reservation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Reservation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input type="text" value={reservation.name} className="w-full p-3 border rounded-lg bg-gray-100" readOnly />
            <Input type="text" value={reservation.email} className="w-full p-3 border rounded-lg bg-gray-100" readOnly />
          </div>

          <Input
            type="text"
            name="approvedBy"
            placeholder="Approved By"
            value={formData.approvedBy}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Status</option>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;

