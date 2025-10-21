"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const CartIndicator = () => {
  const { items } = useCartStore();

  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const itemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const amount = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setTotalItems(itemsCount);
    setTotalAmount(amount);
  }, [items]);

  return (
    <div className="relative flex items-center gap-2 cursor-pointer">
      {/* Animated badge */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="font-semibold">🛒</span>
      <span className="text-gray-700">₹{totalAmount.toFixed(2)}</span>
    </div>
  );
};

export default CartIndicator;
