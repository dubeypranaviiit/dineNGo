"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function OrderSuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // clear cart after successful order
    clearCart();

    const timer = setTimeout(() => {
      router.push("/order");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully ✅
      </h1>

      <p className="text-gray-600">
        Redirecting to your orders...
      </p>
    </div>
  );
}