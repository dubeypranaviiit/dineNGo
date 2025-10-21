// types/staff.ts
export interface Staff {
  _id: string;           // MongoDB ID
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'upcoming';
  employeeId?: string;
}
