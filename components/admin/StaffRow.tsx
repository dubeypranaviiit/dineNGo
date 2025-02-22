import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Staff {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface StaffRowProps {
  staff: Staff;
  handleEdit: (staff: Staff) => void;
  handleDelete: (id: number) => void;
}

const StaffRow: React.FC<StaffRowProps> = ({ staff, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4">{staff.name}</td>
      <td className="px-6 py-4">{staff.role}</td>
      <td className="px-6 py-4">{staff.email}</td>
      <td className="px-6 py-4">{staff.phone}</td>
      <td className="px-6 py-4">{staff.status}</td>
      <td className="px-6 py-4 flex space-x-2">
        <button onClick={() => handleEdit(staff)} className="text-blue-600">
          <FiEdit2 />
        </button>
        <button onClick={() => handleDelete(staff.id)} className="text-red-600">
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default StaffRow;
