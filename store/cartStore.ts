"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export interface CartItem {
  _id: string;      
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void; 
  decrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const existing = get().items.find((i) => i._id === item._id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      decrementItem: (id) => {
        const existing = get().items.find((i) => i._id === id);
        if (!existing) return;

        if (existing.quantity > 1) {
          set({
            items: get().items.map((i) =>
              i._id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({ items: get().items.filter((i) => i._id !== id) });
        }
      },

      removeFromCart: (id) => set({ items: get().items.filter((i) => i._id !== id) }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "restaurant-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
