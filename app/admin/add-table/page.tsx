"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddEditTableModal from "@/components/admin/AddEditTableModal";

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const fetchTables = async () => {
    try {
      const res = await axios.get("/api/tables");
      setTables(res.data.tables || []);
    } catch {
      toast.error("Failed to load tables");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    try {
    await axios.delete(`/api/tables/${id}`);
      toast.success("Table deleted");
      fetchTables();
    } catch {
      toast.error("Failed to delete table");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Tables</h1>
        <button
          onClick={() => {
            setSelectedTable(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add Table
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tables.map((table: any) => (
          <div
            key={table._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Table {table.number}</h2>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  table.status === "available"
                    ? "bg-green-100 text-green-700"
                    : table.status === "reserved"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {table.status}
              </span>
            </div>
            <p className="text-sm mt-2">Seats: {table.seats}</p>
            <p className="text-sm text-gray-600">
              {table.location?.area || "No area info"}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setSelectedTable(table);
                  setShowModal(true);
                }}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(table._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AddEditTableModal
          onClose={() => setShowModal(false)}
          onSaved={fetchTables}
          table={selectedTable}
        />
      )}
    </div>
  );
}
