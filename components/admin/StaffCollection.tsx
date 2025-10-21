// "use client"
// import { useEffect, useState } from "react";
// import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
// import { format } from "date-fns";
// import StaffModal from "./StaffModal";
// import StaffRow from "./StaffRow";
// import SearchBar from "./SearchBar";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Link from "next/link";

// const StaffCollection = () => {
//   const [staffId,setStaffId] = useState("")

// const [staffData, setStaffData] = useState([]);

// useEffect(() => {
//     const getStaffData = async () => {
//       try {
//         const res = await axios.get("/api/staff");
//         if (res.data.success) {
//           setStaffData(res.data.staff); // ✅ Set entire staff array correctly
//         }
//       } catch (error) {
//         console.error(`Error while fetching staff data: ${error}`);
//       }
//     };
//     getStaffData();
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredStaff = staffData.filter((staff) =>
//     staff.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (staff) => {
//     setStaffId(staff._id)
//     setSelectedStaff(staff);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (staffId) => {
//     if (window.confirm("Are you sure you want to delete this staff member?")) {
//       setStaffData(staffData.filter((staff) => staff.id !== staffId));
//     }
//   };
//  useEffect(()=>{
//    console.log(`StaffId:`,staffId);
//  },[handleEdit])
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
//         <Link href="/admin/add-new-staff">
//         <button
        
//           className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
//         >
//                     <FiPlus />
//           <span>Add New Staff</span>
        
//         </button>
//         </Link>
//       </div>

//       <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Staff
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredStaff.map((staff) => (
//               <StaffRow key={staff.id} staff={staff}  handleEdit={handleEdit} handleDelete={handleDelete} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && <StaffModal staff={selectedStaff} staffId={staffId} onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// };

// export default StaffCollection;
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import StaffRow from "./StaffRow";
import StaffModal from "./StaffModal";
import { Staff } from "./staff";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import SearchBar from "./SearchBar";

const StaffCollection: React.FC = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffId, setStaffId] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("/api/staff");
        if (res.data.success) setStaffData(res.data.staff);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStaff();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setStaffId(staff._id);
    setIsModalOpen(true);
  };

  const handleDelete = (_id: string) => {
    if (window.confirm("Are you sure?")) {
      setStaffData(prev => prev.filter(s => s._id !== _id));
    }
  };

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Link href="/admin/add-new-staff">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <FiPlus /> Add New Staff
          </button>
        </Link>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStaff.map(staff => (
              <StaffRow key={staff._id} staff={staff} handleEdit={handleEdit} handleDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedStaff && (
        <StaffModal staff={selectedStaff} staffId={staffId} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default StaffCollection;
