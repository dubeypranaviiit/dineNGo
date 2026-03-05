'use client';
import { useEffect, useState, ChangeEvent } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Link from "next/link";
import ReservationRow from "./ReservationRow";
import ReservationModal from "./ReservationModal";
import SearchBar from "../SearchBar";
import { Reservation } from "./types";

const PendingReservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/reservations");
      if (res.data.success) {
        const normalized: Reservation[] = res.data.reservationData.map((r: any) => ({
          _id: r._id,
          id: r._id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          date: r.date,
          time: r.time,
          approvedBy: r.approvedBy || "",
          status: r.isConfirmed ? "confirmed" : "pending",
        }));
        setReservations(normalized);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const filteredReservations = reservations
    .filter(r => r.status === "pending")
    .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pending Reservations</h1>
        <Link href="/admin/reservation-mangement">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all">
            <FiPlus />
            <span>All Reservations</span>
          </button>
        </Link>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="overflow-x-auto mt-4">
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading...</p>
        ) : filteredReservations.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No pending reservations found.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReservations.map(res => (
                <ReservationRow key={res.id} reservation={res} handleEdit={handleEdit} handleDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && selectedReservation && (
        <ReservationModal reservation={selectedReservation} onClose={() => { setIsModalOpen(false); fetchReservations(); }} />
      )}
    </div>
  );
};

export default PendingReservation;
