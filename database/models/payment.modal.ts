import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  reservationId?: mongoose.Types.ObjectId | null;
  amount: number;
  currency: string;
  paymentIntentId: string;
  paymentStatus: "pending" | "succeeded" | "failed";
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
      default: null, // ✅ allows creating payment before reservation
      required: false,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "inr" },
    paymentIntentId: { type: String, required: true, index: true, unique: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
      index: true,
    },
    paymentMethod: { type: String, default: "card" },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
