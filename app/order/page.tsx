"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}
interface Order {
  _id: string;
  cartItems: OrderItem[];
  totalAmount: number;
  status: string;
  pickupTime?: string;
  createdAt: string;
}
const OrderPage: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/orders?clerkId=${user.id}${statusFilter ? `&status=${statusFilter}` : ""}`);
      setOrders(res.data.orders);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [user, statusFilter]);
  if (!user) return <div className="mt-20 text-center">Please sign in to view your orders.</div>;
  return (
    <div className="max-w-5xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="flex gap-4 mb-6">
        {["", "placed", "paid", "readyForPickup", "completed", "cancelled"].map((status) => (
          <button
            key={status || "all"}
            className={`px-4 py-2 rounded-full border ${
              statusFilter === status ? "bg-amber-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status ? status : "All"}
          </button>
        ))}
      </div>
      {orders.length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID:</span>
                <span>{order._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Status:</span>
                <span className="capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Pickup Time:</span>
                <span>{order.pickupTime ? new Date(order.pickupTime).toLocaleString() : "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="ml-4 list-disc">
                  {order.cartItems.map((item) => (
                    <li key={item.itemId}>
                      {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
