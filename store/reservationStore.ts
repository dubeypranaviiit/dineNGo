import { create } from "zustand";
import axios from "axios";
export interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string; 
  time: string;
  guests: number;
  isConfirmed: boolean;
  tableId: string;
  paymentStatus: string;
  createdAt: string;
}

export interface ReservationState {
  reservations: Reservation[];
  filteredReservations: Reservation[];
  loading: boolean;
  error: string | null;
  filter: "all" | "upcoming" | "previous";

  fetchReservations: (clerkId: string) => Promise<void>;
  setFilter: (filter: "all" | "upcoming" | "previous") => void;
  applyFilter: (filter: "all" | "upcoming" | "previous") => void; 
  clearReservations: () => void;
}
export const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: [],
  filteredReservations: [],
  loading: false,
  error: null,
  filter: "all",
  fetchReservations: async (clerkId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/api/reservation?clerkId=${clerkId}`);
      const reservations: Reservation[] = res.data.reservations;

      set({ reservations, loading: false });
      get().applyFilter(get().filter);
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch reservations", loading: false });
    }
  },

  setFilter: (filter) => {
    set({ filter });
    get().applyFilter(filter);
  },

  applyFilter: (filter) => {
    const now = new Date();
    const { reservations } = get();
    let filtered: Reservation[] = [];

    if (filter === "all") filtered = reservations;
    if (filter === "upcoming")
      filtered = reservations.filter((r) => new Date(r.date) >= now);
    if (filter === "previous")
      filtered = reservations.filter((r) => new Date(r.date) < now);

    set({ filteredReservations: filtered });
  },

  clearReservations: () =>
    set({ reservations: [], filteredReservations: [], loading: false, error: null }),
}));
