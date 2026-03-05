
import mongoose, { Schema, Document } from "mongoose";

export interface ITable extends Document {
  number: number;
  seats: number;
  status: "available" | "maintenance";
}

const TableSchema = new Schema<ITable>(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Table ||
  mongoose.model<ITable>("Table", TableSchema);