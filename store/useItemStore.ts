import { create } from "zustand";
import axios from "axios";

interface Item {
  name: string;
  category: string;
  diet: string;
  price: number;
  description: string;
  image: string;
  isSpecial: boolean;
}

interface ItemState {
  items: Item[];
  setItems: (items: Item[]) => void;
  loadItems: () => Promise<void>;
}

const CACHE_KEY = "items_cache";
const CACHE_TIME = 15 * 60 * 1000; // 15 minutes
const isClient = typeof window !== "undefined";

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],
  setItems: (items) => {
    set({ items });
    if (isClient) {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ items, timestamp: Date.now() })
      );
    }
  },
  loadItems: async () => {
    try {
      let cached = null;
      if (isClient) {
        cached = localStorage.getItem(CACHE_KEY);
      }

      if (cached) {
        const { items, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIME) {
          set({ items });
          return;
        }
      }

      const res = await axios.get<{ items: Item[] }>("/api/item");
      set({ items: res.data.items });

      if (isClient) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ items: res.data.items, timestamp: Date.now() })
        );
      }
    } catch (err) {
      console.error("Failed to load items:", err);
    }
  },
}));
