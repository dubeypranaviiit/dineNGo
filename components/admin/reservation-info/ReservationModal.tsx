"use client";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Reservation {
  id: string;
  status: string;
  
}

interface ReservationModalProps {
  reservation: Reservation | null;
  onClose: () => void;
  reservationId: string;
}

const statusOptions = ["confirmed", "pending", "canceled"];

const ReservationModal: React.FC<ReservationModalProps> = ({ reservation, onClose, reservationId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: reservationId || "",
    approvedBy: reservation?.email || "",
    status:" "
   
  });

  // Populate form when reservation changes
  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id || reservationId,
        approvedBy: reservation.approvedBy || "",
        status:""
      });
    }
  }, [reservation, reservationId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/reservation", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Reservation updated successfully!");
        setFormData({ id: "" ,  approvedBy:""});
        onClose();
      } else {
        toast.error("Error updating reservation data.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Reservation</h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-3">
          <div className="grid grid-cols-2 gap-2">
          <Input
              type="text"
              name="approvedBy"
              placeholder="approved By"
              value={reservationId}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
             <Input
              type="text"
              name="approvedBy"
              placeholder="Guest Name"
              value={reservation.name}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
            <Input
              type="text"
              name="approvedBy"
              placeholder="approved By"
              value={formData. approvedBy}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            {/* <Input
              type="text"
              name="tableNo"
              placeholder="approved By"
              value={formData. approvedBy}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            /> */}
         
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Update Reservation"}
          </button>

          <button type="button" onClick={onClose} className="w-full py-3 mt-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
