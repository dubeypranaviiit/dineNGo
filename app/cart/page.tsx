"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs"; // Clerk hook
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";

const CartPage: React.FC = () => {
  const { user } = useUser(); // current signed-in user
  const { items, clearCart, addToCart, decrementItem, removeFromCart } = useCartStore();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Please sign in to proceed with checkout.");
      return;
    }

    if (totalAmount < 50) {
      alert("Total amount must be at least ₹50 to process payment.");
      return;
    }

    try {
      const res = await axios.post("/api/create-checkout-session", {
        clerkId: user.id,
        cartItems: items.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
        pickupTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
      });

      if (res.data.url) {
        clearCart(); // clear cart after order
        window.location.href = res.data.url; // redirect to Stripe checkout
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert("Error starting payment: " + (err.response?.data?.message || err.message));
    }
  };

  if (items.length === 0) {
    return <div className="text-center text-gray-600 mt-20">Your cart is empty 🍽️</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Your Order (Pickup Only)</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-gray-600">
                  ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                    +
                  </Button>
                  <span>{item.quantity}</span>
                  <Button size="sm" variant="outline" onClick={() => decrementItem(item._id)}>
                    -
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="destructive" onClick={() => removeFromCart(item._id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 text-xl font-semibold">
        <span>Total:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      <div className="mt-6">
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleCheckout}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
