import { create } from "zustand";
import axios from "axios";

export interface Item {
  _id: string;
  name: string;
  category: string;
  dietType: string;
  price: number;
  description: string;
  image: string;
  isSpecial: boolean;
}

interface ItemState {
  items: Item[];

  loadItems: () => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (item: Item) => void;
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],

  loadItems: async () => {
    if (get().items.length > 0) return; // prevent refetch

    const res = await axios.get("/api/item");

    set({ items: res.data.items });
  },

  deleteItem: async (id) => {
    await axios.delete(`/api/item/${id}`);

    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));
  },

  updateItem: (updatedItem) => {
    set((state) => ({
      items: state.items.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    }));
  },
}));