export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  _id: string;  
  id: string;  
  name: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  status: ReservationStatus;
  approvedBy?: string;
}
