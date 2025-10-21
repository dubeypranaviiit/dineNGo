// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId; // or clerkId:string if using Clerk
  cartItems: {
    itemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "placed" | "paid" | "readyForPickup" | "completed";
  pickupTime?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending","placed", "paid", "readyForPickup", "completed","cancelled"],
      default: "placed",
    },
    pickupTime: { type: Date },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
export default Order;
