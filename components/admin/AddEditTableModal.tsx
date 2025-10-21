"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddEditTableModal({ onClose, onSaved, table }: any) {
  const [form, setForm] = useState({
    number: table?.number || "",
    seats: table?.seats || "",
    status: table?.status || "available",
    window: table?.location?.window || "",
    area: table?.location?.area || "",
    section: table?.location?.section || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (table) {
        await axios.put(`/api/tables/${table._id}`, {
          number: Number(form.number),
          seats: Number(form.seats),
          status: form.status,
          location: {
            window: form.window,
            area: form.area,
            section: form.section,
          },
        });
        toast.success("Table updated successfully");
      } else {
        await axios.post("/api/tables", {
          number: Number(form.number),
          seats: Number(form.seats),
          status: form.status,
          location: {
            window: form.window,
            area: form.area,
            section: form.section,
          },
        });
        toast.success("Table added successfully");
      }
      onSaved();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-3/4 max-w-4xl rounded-2xl shadow-xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">
          {table ? "Update Table" : "Add New Table"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Table Number</label>
              <input
                type="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Seats</label>
              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Location (optional)</h2>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="window"
                placeholder="Window"
                value={form.window}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={form.area}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="section"
                placeholder="Section"
                value={form.section}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              {table ? "Update" : "Add"} Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
