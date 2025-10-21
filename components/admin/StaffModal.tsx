// "use client"
// import { Input } from "@/components/ui/input"
// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';;
// interface Staff {
//   id: number;
//   name: string;
//   role: string;
//   email: string;
//   phone: string;
//   status: string;
//   employeeId:string;
// }

// interface StaffModalProps {
//   staff: Staff | null;
//   onClose: () => void;
//   staffId:string;
// }
// const role = ['Server', 'Bartender', 'Busser', 'Cashier', 'Line cook','Prep cook','Dishwasher','Executive chef','Sous chef','Restaurant manager'];
// const statusStaff = ['active', 'inactive', 'upcoming'];
// const StaffModal: React.FC<StaffModalProps> = ({ staff, onClose,staffId }) => {
//   const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//       id:`${staffId}`,
//       email: '',
//       phone: '',
//       status: '',
//       role: '',
//       employeeId:''
//     });
//     // useEffect(() => {
//     //   if (staff) {
//     //     setFormData({
//     //       id: staff.id || "", // Ensure ID is set
//     //       email: staff.email || "",
//     //       phone: staff.phone || "",
//     //       role: staff.role || "",
//     //       status: staff.status || "",
//     //     });
//     //   }
//     // }, [staff]);
//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//       const { name, value, type, checked } = e.target;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value,
//       }));
//     };
//     const handleSubmit = async (e: FormEvent) => {
//       e.preventDefault();
//       setLoading(true);
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', formData.id);
//       formDataToSend.append('employeeId', formData.employeeId);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone', formData.phone);
//       formDataToSend.append('role', formData.role);
//       formDataToSend.append('status', formData.status);
     
  
//       try {
//         const response = await axios.put('/api/staff', formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
  
//         if (response.data.success) {
//           toast.success('staff  updated successfully!');
//           setFormData({ id: '', email: '', phone: '', role: '', status: ''});
  
//         } else {
//           toast.error('Error updating data');
//         }
//       } catch (error) {
//         toast.error('Something went wrong!');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     useEffect(()=>{
//       console.log(formData);
//     },[])
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">
//           {staff ? "Edit Staff" : "Add New Staff"}
//         </h2>
//         {/* <form className="space-y-4">
//           <div className="flex justify-end space-x-2">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
//               Save
//             </button>
//           </div>
//         </form> */}
//           <form onSubmit={handleSubmit} className="space-y-6 mt-3">
//           {/* Image Upload */}
          
//           <div className="grid grid-cols-2 gap-2">
//              <Input type="email" name="email" placeholder="Staff Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
//                     <Input type="text" name="phone" placeholder="Staff Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
//                     <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
//                       <option value="">Select Role</option>
//                       {role.map((role) => (
//                         <option key={role} value={role}>
//                           {role}
//                         </option>
//                       ))}
//                     </select>
//                     <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
//                       <option value="">Status</option>
//                       {statusStaff.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//           <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all" disabled={loading}>
//             {loading ? 'Submitting...' : 'Update Staff'}
//           </button>
//           <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StaffModal;
"use client";

import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Staff } from "./staff";

interface StaffModalProps {
  staff: Staff | null;
  staffId: string;
  onClose: () => void;
}

const roles = ['Server', 'Bartender', 'Busser', 'Cashier', 'Line cook','Prep cook','Dishwasher','Executive chef','Sous chef','Restaurant manager'];
const statusOptions: Staff['status'][] = ['active', 'inactive', 'upcoming'];

const StaffModal: React.FC<StaffModalProps> = ({ staff, staffId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: staffId,
    email: staff?.email || '',
    phone: staff?.phone || '',
    role: staff?.role || '',
    status: staff?.status || '',
    employeeId: staff?.employeeId || ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put('/api/staff', formData);
      if (response.data.success) {
        toast.success('Staff updated successfully!');
        onClose();
      } else {
        toast.error('Failed to update staff');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{staff ? "Edit Staff" : "Add New Staff"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <Input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded">{loading ? 'Updating...' : 'Update'}</button>
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
