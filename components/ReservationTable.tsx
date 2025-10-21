// // "use client";
// // import { useState } from "react";
// // import { FaCheck, FaTimes, FaEye, FaSearch, FaSort } from "react-icons/fa";

// // interface Reservation {
// //   id: number;
// //   guestName: string;
// //   email: string;
// //   phone: string;
// //   date: string;
// //   timeSlot: string;
// //   guests: number;
// //   specialRequests?: string;
// //   status: "Pending" | "Confirmed";
// // }

// // const ReservationsTable: React.FC = () => {
// //   const [reservations, setReservations] = useState<Reservation[]>([
// //     {
// //       id: 1,
// //       guestName: "John Smith",
// //       email: "john.smith@email.com",
// //       phone: "+1 234-567-8900",
// //       date: "2024-02-15",
// //       timeSlot: "19:00",
// //       guests: 4,
// //       specialRequests: "Window seat preferred",
// //       status: "Pending",
// //     },
// //     {
// //       id: 2,
// //       guestName: "Emma Wilson",
// //       email: "emma.w@email.com",
// //       phone: "+1 234-567-8901",
// //       date: "2024-02-16",
// //       timeSlot: "20:00",
// //       guests: 2,
// //       specialRequests: "Allergic to nuts",
// //       status: "Confirmed",
// //     },
// //     {
// //       id: 3,
// //       guestName: "Michael Brown",
// //       email: "m.brown@email.com",
// //       phone: "+1 234-567-8902",
// //       date: "2024-02-17",
// //       timeSlot: "18:30",
// //       guests: 6,
// //       specialRequests: "Birthday celebration",
// //       status: "Pending",
// //     },
// //   ]);

// //   const [searchTerm, setSearchTerm] = useState<string>("");
// //   const [showModal, setShowModal] = useState<boolean>(false);
// //   const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
// //   const [currentPage, setCurrentPage] = useState<number>(1);
// //   const itemsPerPage = 5;

// //   const handleConfirm = (id: number) => {
// //     setReservations((prevReservations) =>
// //       prevReservations.map((reservation) =>
// //         reservation.id === id ? { ...reservation, status: "Confirmed" } : reservation
// //       )
// //     );
// //   };

// //   const handleCancel = (reservation: Reservation) => {
// //     setSelectedReservation(reservation);
// //     setShowModal(true);
// //   };

// //   const confirmCancel = () => {
// //     if (selectedReservation) {
// //       setReservations((prevReservations) =>
// //         prevReservations.filter((r) => r.id !== selectedReservation.id)
// //       );
// //     }
// //     setShowModal(false);
// //     setSelectedReservation(null);
// //   };

// //   const filteredReservations = reservations.filter(
// //     (reservation) =>
// //       reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       <div className="mb-6 flex justify-between items-center">
// //         <h2 className="text-2xl font-bold text-gray-800">Reservations Management</h2>
// //         <div className="relative">
// //           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search reservations..."
// //             className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto bg-white rounded-lg shadow">
// //         <table className="w-full table-auto">
// //           <thead>
// //             <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
// //               <th className="py-3 px-6 text-left flex items-center cursor-pointer">
// //                 Guest Name <FaSort className="ml-2" />
// //               </th>
// //               {/* <th className="py-3 px-6 text-left">Email</th>
// //               <th className="py-3 px-6 text-left">Phone</th> */}
// //               <th className="py-3 px-6 text-left">Date</th>
// //               <th className="py-3 px-6 text-left">Time</th>
// //               <th className="py-3 px-6 text-center">Guests</th>
// //               <th className="py-3 px-6 text-left">Special Requests</th>
// //               <th className="py-3 px-6 text-center">Status</th>
// //               <th className="py-3 px-6 text-center">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="text-gray-600 text-sm">
// //             {currentItems.map((reservation, index) => (
// //               <tr
// //                 key={reservation.id}
// //                 className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
// //               >
// //                 <td className="py-4 px-6 text-left">{reservation.guestName}</td>
// //                 {/* <td className="py-4 px-6 text-left">{reservation.email}</td> */}
// //                 {/* <td className="py-4 px-6 text-left">{reservation.phone}</td> */}
// //                 <td className="py-4 px-6 text-left">{reservation.date}</td>
// //                 <td className="py-4 px-6 text-left">{reservation.timeSlot}</td>
// //                 <td className="py-4 px-6 text-center">{reservation.guests}</td>
// //                 <td className="py-4 px-6 text-left truncate max-w-xs">{reservation.specialRequests}</td>
// //                 <td className="py-4 px-6 text-center">
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-xs ${
// //                       reservation.status === "Confirmed"
// //                         ? "bg-green-200 text-green-800"
// //                         : "bg-yellow-200 text-yellow-800"
// //                     }`}
// //                   >
// //                     {reservation.status}
// //                   </span>
// //                 </td>
// //                 <td className="py-4 px-6 text-center">
// //                   <div className="flex justify-center space-x-2">
// //                     <button
// //                       onClick={() => handleConfirm(reservation.id)}
// //                       className="text-green-600 hover:text-green-800"
// //                       disabled={reservation.status === "Confirmed"}
// //                     >
// //                       <FaCheck className="w-5 h-5" />
// //                     </button>
// //                     <button
// //                       onClick={() => handleCancel(reservation)}
// //                       className="text-red-600 hover:text-red-800"
// //                     >
// //                       <FaTimes className="w-5 h-5" />
// //                     </button>
// //                     <button className="text-blue-600 hover:text-blue-800">
// //                       <FaEye className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div className="mt-4 flex justify-between items-center">
// //         <div className="text-gray-600">
// //           Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReservations.length)} of{" "}
// //           {filteredReservations.length} entries
// //         </div>
// //         <div className="flex space-x-2">
// //           <button
// //             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //             disabled={currentPage === 1}
// //             className="px-4 py-2 border rounded-lg disabled:opacity-50"
// //           >
// //             Previous
// //           </button>
// //           <button
// //             onClick={() => setCurrentPage((prev) => prev + 1)}
// //             disabled={indexOfLastItem >= filteredReservations.length}
// //             className="px-4 py-2 border rounded-lg disabled:opacity-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReservationsTable;
// import React from "react";

// const ReservationsTable = ({ reservations }) => {
//   if (!reservations?.length) {
//     return <p className="text-center text-gray-500">No reservations found.</p>;
//   }

//   return (
//     <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {reservations.map((r) => (
//           <tr key={r._id}>
//             <td className="px-6 py-4">{r.name}</td>
//             <td className="px-6 py-4">{r.date}</td>
//             <td className="px-6 py-4">{r.time}</td>
//             <td className="px-6 py-4">{r.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ReservationsTable;
"use client";
import React from "react";

// Define the type for a single reservation
interface Reservation {
  _id: string;
  name: string;
  date: string;
  time: string;
  status: string;
}

// Props for the component
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
