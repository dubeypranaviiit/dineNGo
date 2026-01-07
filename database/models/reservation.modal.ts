
import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  user?: mongoose.Types.ObjectId; 
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  tableId: { type: Schema.Types.ObjectId, ref: "Table", default: null, index: true };
 paymentStatus: "pending" | "paid";
  isConfirmed: boolean;
  approvedBy?: string | null;
  approvedAt?: Date | null;
  payment?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
      stripeSessionId:string;
}

const ReservationSchema = new Schema<IReservation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    guests: { type: Number, min: 1, max: 30, default: 1 },
    isConfirmed: { type: Boolean, default: false, index: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    stripeSessionId: { type: String },

    approvedBy: { type: String, default: null },
    approvedAt: { type: Date, default: null },
    payment: { type: Schema.Types.ObjectId, ref: "Payment", default: null },
  },
  { timestamps: true }
);
ReservationSchema.index({ date: 1, time: 1 });

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

