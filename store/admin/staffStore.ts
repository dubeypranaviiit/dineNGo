import { create } from "zustand";
import axios from "axios";

export interface Staff {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface StaffState {
  staff: Staff[];
  loadStaff: () => Promise<void>;
  removeStaff: (id: string) => void;
}

const CACHE_KEY = "staff_cache";
const CACHE_TIME = 15 * 60 * 1000;

export const useStaffStore = create<StaffState>((set) => ({
  staff: [],

  loadStaff: async () => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);

      if (Date.now() - timestamp < CACHE_TIME) {
        set({ staff: data });
        return;
      }
    }

    const res = await axios.get("/api/staff");

    if (res.data.success) {
      set({ staff: res.data.staff });

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: res.data.staff,
          timestamp: Date.now(),
        })
      );
    }
  },

  removeStaff: (id) =>
    set((state) => ({
      staff: state.staff.filter((s) => s._id !== id),
    })),
}));