import mongoose, { Schema, Document } from "mongoose";

export interface ITable extends Document {
  number: number;
  seats: number;
  status: "available" | "reserved" | "maintenance";
  location?: {
    window?: string;
    area?: string;
    section?: string;
  };
}

const TableSchema = new Schema<ITable>(
  {
    number: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "reserved", "maintenance"],
      default: "available",
    },
    location: {
      window: { type: String },
      area: { type: String },
      section: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Table ||
  mongoose.model<ITable>("Table", TableSchema);
