import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkUserId: string;       // Clerk subject id (primary link)
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin" | "staff";
  stripeCustomerId?: string; // optional, store Stripe Customer ID
  reservations?: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
    stripeCustomerId: { type: String },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
