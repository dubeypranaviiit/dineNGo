"use client";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
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
