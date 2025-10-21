"use client";
import { create } from "zustand";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  diet: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (item) => {
    const existing = get().cart.find((c) => c._id === item._id);
    if (existing) {
      set({
        cart: get().cart.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        ),
      });
    } else {
      set({ cart: [...get().cart, { ...item, quantity: 1 }] });
    }
  },
  removeFromCart: (id) =>
    set({ cart: get().cart.filter((c) => c._id !== id) }),
  increaseQty: (id) =>
    set({
      cart: get().cart.map((c) =>
        c._id === id ? { ...c, quantity: c.quantity + 1 } : c
      ),
    }),
  decreaseQty: (id) =>
    set({
      cart: get().cart
        .map((c) =>
          c._id === id && c.quantity > 1
            ? { ...c, quantity: c.quantity - 1 }
            : c
        )
        .filter((c) => c.quantity > 0),
    }),
  clearCart: () => set({ cart: [] }),
  get totalAmount() {
    return get().cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  },
}));
