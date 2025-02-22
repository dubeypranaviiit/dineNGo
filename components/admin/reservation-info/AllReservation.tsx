// "use client";
// import { useEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import axios from "axios";
// import Link from "next/link";
// import ReservationRow from "./ReservationRow";
// import ReservationModal from "./ReservationModal";
// import SearchBar from "../SearchBar";

// const AllReservation = () => {
//   const [reservationId, setReservationId] = useState(""); // Correct variable name
//   const [reservationData, setReservationData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState(null);

//   useEffect(() => {
//     const getReservationData = async () => {
//       try {
//         const res = await axios.get("/api/reservation");
//         if (res.data.success) {
//           setReservationData(res.data.reservationData);
//         }
//       } catch (error) {
//         console.log(`Error while fetching reservation data: ${error}`);
//       }
//     };
//     getReservationData();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredReservation = reservationData.filter((reservation) =>
//     reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (reservation) => {
//     setReservationId(reservation._id); 
//     setSelectedReservation(reservation); 
//     setIsModalOpen(true);
//   };

//   const handleDelete = (reservationId) => {
//     if (window.confirm("Are you sure you want to delete this reservation?")) {
//       setReservationData(reservationData.filter((res) => res.id !== reservationId));
//     }
//   };

//   useEffect(() => {
//     console.log(`ReservationId:`, reservationId);
//   }, [reservationId]); // Fix dependency

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Reservation Management</h1>
//         {/* <Link href="/admin/add-new-reservation">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
//             <FiPlus />
//             <span>Add New Reservation</span>
//           </button>
//         </Link> */}
//       </div>

//       <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Time
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredReservation.map((reservation) => (
//               <ReservationRow
//                 key={reservation.id}
//                 reservation={reservation} // Fix prop name
//                 handleEdit={handleEdit}
//                 handleDelete={handleDelete}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <ReservationModal
//           reservation={selectedReservation} // Correct variable name
//           reservationId={reservationId} // Pass correct ID
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AllReservation;
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ReservationRow from "./ReservationRow";
import ReservationModal from "./ReservationModal";
import SearchBar from "../SearchBar";

const AllReservation = ({ isConfirmed = null }) => { // Default to show all reservations
  const [reservationId, setReservationId] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const getReservationData = async () => {
      try {
        const res = await axios.get("/api/reservation");
        if (res.data.success) {
          setReservationData(res.data.reservationData);
        }
      } catch (error) {
        console.log(`Error while fetching reservation data: ${error}`);
      }
    };
    getReservationData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // ✅ Filter reservations based on 'isConfirmed' status & search term
  const filteredReservation = reservationData
    .filter((reservation) =>
      isConfirmed === "confirmed" ? reservation.isConfirmed : 
      isConfirmed === "pending" ? !reservation.isConfirmed : true
    ) // ← Filter by confirmation status
    .filter((reservation) =>
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (reservation) => {
    setReservationId(reservation._id);
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDelete = (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setReservationData(reservationData.filter((res) => res.id !== reservationId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isConfirmed === "confirmed" ? "Confirmed Reservations" :
           isConfirmed === "pending" ? "Pending Reservations" :
           "All Reservations"}
        </h1>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="overflow-x-auto">
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
            {filteredReservation.map((reservation) => (
              <ReservationRow
                key={reservation.id}
                reservation={reservation}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ReservationModal
          reservation={selectedReservation}
          reservationId={reservationId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllReservation;

