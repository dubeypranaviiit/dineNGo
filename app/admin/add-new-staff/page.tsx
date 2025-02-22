'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { IStaff } from "@/database/models/staff.modal";

const role = ['Server', 'Bartender', 'Busser', 'Cashier', 'Line cook','Prep cook','Dishwasher','Executive chef','Sous chef','Restaurant manager'];
const statusStaff = ['active', 'inactive', 'upcoming'];

const AddStaff = () => {
    // const [staff,setStaff] = useState<IStaff>({});
  const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        status: "",
        specialization: "",
        employeeId: "",
  });
  const [imageItem, setImageItem] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, and WEBP allowed.');
      return;
    }
    setImageItem(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageItem) {
      toast.error('Please upload an image.');
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('specialization', formData.specialization);
    formDataToSend.append('employeeId', formData.employeeId);
    formDataToSend.append('image', imageItem);

    try {
      const response = await axios.post('/api/staff', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('staff added successfully!');
        setFormData({ name: '', email: '', phone: '', role: '', status: '', specialization:'',employeeId:'' });
        setImageItem(null);
        setImagePreview(null);
      } else {
        toast.error('Error submitting data');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    console.log(formData);
  },[])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Add Staff</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-3">
          <p className="text-xl mt-2">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer mt-4">
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" width={140} height={70} className="mt-4 rounded-lg" />
            ) : (
              <div className="w-36 h-20 border border-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </label>
          <Input type="file" id="image" hidden ref={fileInputRef} onChange={handleImageChange} className="mt-2" />
          <Input type="text" name="name" placeholder="Staff Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          <Input type="email" name="email" placeholder="Staff Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          <Input type="text" name="phone" placeholder="Staff Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
            <option value="">Select Role</option>
            {role.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
            <option value="">Status</option>
            {statusStaff.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Input type="text" name="employeeId" placeholder="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          <Textarea name="specialization" placeholder="specialization" value={formData.specialization} onChange={handleChange} rows={3} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required></Textarea>
          
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Staff'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
