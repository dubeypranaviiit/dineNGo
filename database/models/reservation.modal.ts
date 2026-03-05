import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  user?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;

  date: Date;
  time: string;

  guests: number;

  tableId: mongoose.Types.ObjectId;

  paymentStatus: "pending" | "paid";
  isConfirmed: boolean;

  stripeSessionId?: string;
}

const ReservationSchema = new Schema<IReservation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    date: { type: Date, required: true },
    time: { type: String, required: true },

    guests: { type: Number, min: 1, max: 30 },

    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    stripeSessionId: String,
  },
  { timestamps: true }
);

ReservationSchema.index({ date: 1, time: 1, tableId: 1 });

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);
