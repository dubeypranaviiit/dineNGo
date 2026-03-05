'use client';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials'];
const dietTypes = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Gluten-Free'];

interface FormDataType {
  name: string;
  category: string;
  dietType: string;
  price: string;
  description: string;
  isSpecial: boolean;
}

const AddItem = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    category: '',
    dietType: '',
    price: '',
    description: '',
    isSpecial: false,
  });
  const [imageItem, setImageItem] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle normal inputs (text, textarea, select)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox input
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
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
    formDataToSend.append('category', formData.category);
    formDataToSend.append('diet', formData.dietType);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('isSpecial', String(formData.isSpecial));
    formDataToSend.append('image', imageItem);

    try {
      const response = await axios.post('/api/item', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('Item added successfully!');
        setFormData({ name: '', category: '', dietType: '', price: '', description: '', isSpecial: false });
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Add Menu Item</h2>
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

          <Input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />

          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            {dietTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 border p-2 rounded-lg">
                <input type="radio" name="dietType" value={type} checked={formData.dietType === type} onChange={handleInputChange} required />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <Input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />

          <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required></Textarea>

          <label className="flex items-center">
            <Input type="checkbox" name="isSpecial" checked={formData.isSpecial} onChange={handleCheckboxChange} className="mr-2" />
            <p>Special Item</p>
          </label>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Menu Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
