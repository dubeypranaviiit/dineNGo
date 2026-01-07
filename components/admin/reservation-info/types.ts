export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  _id: string;  // original backend ID
  id: string;   // normalized ID for frontend consistency
  name: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  status: ReservationStatus;
  approvedBy?: string;
}
