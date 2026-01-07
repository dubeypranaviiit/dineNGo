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
