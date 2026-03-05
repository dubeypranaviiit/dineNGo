'use client';
import { useEffect } from "react";
import UpdateCard from "@/components/admin/UpdateCard";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/store/admin/itemStore";

const Update = () => {
  const router = useRouter();

  const { items, loadItems, deleteItem } = useItemStore();

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItem(id);
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
        {items.map((dish) => (
          <UpdateCard
            key={dish._id}
            {...dish}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Update;