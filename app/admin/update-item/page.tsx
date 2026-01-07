'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateCard from "@/components/admin/UpdateCard";
import { useRouter } from "next/navigation";
interface Dish {
  _id: string;
  name: string;
  category?: string;
  price?: number;
  description?: string;
  image?: string;
  isSpecial?: boolean;
}

const Update = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getMenuItem = async () => {
      try {
        const res = await axios.get("/api/item");
        if (res.data.success) {
          setDishes(res.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMenuItem();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/item/${id}`);
      setDishes(dishes.filter((dish) => dish._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
      <button
        onClick={() => router.push("/admin/add-item")}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Dish
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <UpdateCard key={dish._id} {...dish} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Update;

