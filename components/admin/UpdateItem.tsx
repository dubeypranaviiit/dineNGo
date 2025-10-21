// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import axios from "axios";
// import { toast } from "react-toastify";

// const categories = ["Appetizers", "Main Course", "Desserts", "Beverages", "Specials"];
// const dietTypes = ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free"];

// const UpdateItem = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const itemId = searchParams.get("id");

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     dietType: "",
//     price: "",
//     description: "",
//     isSpecial: false,
//     image: "",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   useEffect(() => {
//     if (itemId) {
//       axios.get(`/api/food/${itemId}`).then((response) => {
//         setFormData(response.data);
//         setImagePreview(response.data.image);
//       });
//     }
//   }, [itemId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === "checkbox" ? checked : value;
//     setFormData((prev) => ({ ...prev, [name]: fieldValue }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       updatedData.append(key, value.toString());
//     });
//     if (imageFile) updatedData.append("image", imageFile);

//     try {
//       await axios.put(`/api/food/${itemId}`, updatedData);
//       toast.success("Item updated successfully!");
//       router.push("/admin/update-item");
//     } catch (error) { 
//         console.log(error);
//       toast.error("Error updating item");
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm("Are you sure you want to delete this item?")) {
//       try {
//         await axios.delete(`/api/food/${itemId}`);
//         toast.success("Item deleted successfully!");
//         router.push("/menu");
//       } catch (error) {
//         console.log(error);
//         toast.error("Error deleting item");
//       }
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Update Item</h2>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="w-full p-2 border rounded" required />
//         <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>
//         <select name="dietType" value={formData.dietType} onChange={handleChange} className="w-full p-2 border rounded">
//           {dietTypes.map((diet) => (
//             <option key={diet} value={diet}>{diet}</option>
//           ))}
//         </select>
//         <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
//         <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
//         <div>
//           <label className="block mb-2">Upload Image</label>
//           {imagePreview && <Image src={imagePreview} alt="Preview" width={150} height={100} className="mb-2" />}
//           <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
//         </div>
//         <label className="flex items-center space-x-2">
//           <input type="checkbox" name="isSpecial" checked={formData.isSpecial} onChange={handleChange} />
//           <span>Special Item</span>
//         </label>
//         <div className="flex space-x-4">
//           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
//           <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateItem;
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages", "Specials"];
const dietTypes = ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free"];

const UpdateItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dietType: "",
    price: "",
    description: "",
    isSpecial: false,
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (itemId) {
      axios.get(`/api/food/${itemId}`).then((response) => {
        setFormData(response.data);
        setImagePreview(response.data.image);
      });
    }
  }, [itemId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    // Type assertion to fix the TS error
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value.toString());
    });
    if (imageFile) updatedData.append("image", imageFile);

    try {
      await axios.put(`/api/food/${itemId}`, updatedData);
      toast.success("Item updated successfully!");
      router.push("/admin/update-item");
    } catch (error) {
      console.log(error);
      toast.error("Error updating item");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/api/food/${itemId}`);
        toast.success("Item deleted successfully!");
        router.push("/menu");
      } catch (error) {
        console.log(error);
        toast.error("Error deleting item");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Item</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          name="dietType"
          value={formData.dietType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {dietTypes.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <label className="block mb-2">Upload Image</label>
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={150}
              height={100}
              className="mb-2"
            />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isSpecial"
            checked={formData.isSpecial}
            onChange={handleChange}
          />
          <span>Special Item</span>
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
