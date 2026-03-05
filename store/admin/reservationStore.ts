import { create } from "zustand";
import axios from "axios";

export interface Reservation {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed";
  approvedBy?: string;
}

interface ReservationState {
  reservations: Reservation[];
  loadReservations: () => Promise<void>;
  removeReservation: (id: string) => void;
}

const CACHE_KEY = "reservation_cache";
const CACHE_TIME = 15 * 60 * 1000;

export const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],

  loadReservations: async () => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);

      if (Date.now() - timestamp < CACHE_TIME) {
        set({ reservations: data });
        return;
      }
    }

    const res = await axios.get("/api/reservations");

    if (res.data.success) {
      const normalized = res.data.reservationData.map((r: any) => ({
        _id: r._id,
        id: r._id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        date: r.date,
        time: r.time,
        approvedBy: r.approvedBy || "",
        status: r.isConfirmed ? "confirmed" : "pending",
      }));

      set({ reservations: normalized });

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: normalized,
          timestamp: Date.now(),
        })
      );
    }
  },

  removeReservation: (id) =>
    set((state) => ({
      reservations: state.reservations.filter((r) => r.id !== id),
    })),
}));