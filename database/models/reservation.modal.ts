// import mongoose, { Schema, Document } from "mongoose";

// export interface IReservation extends Document {
//   name: string;
//   email: string;
//   date: Date;
//   phone: number;
//   time: string;
//   guests:number,
//   isConfirmed:boolean,
//   approvedBy:string,
//   approvedAt:Date
// }
// const ReservationSchema: Schema = new Schema(
//   {
//     name: {
//          type: String,
//          required: true
//          },
//     email: {
//          type: String, 
//          required: true
//          },
//     phone: { 
//         type: Number, 
//         required: true
//      },
//      date: {
//           type: Date,
//           required: true 
//           },
//     time: { 
//         type: String, 
//         required: true 
//     },
 
//     guests: {
//          type: Number,
//          min: 1,
//          max: 30,
//          default: 1,
//          },
//      isConfirmed:{
//         type:Boolean,
//         default:false
//      },
//      approvedBy: { 
//         type: String, 
//         default: null 
//     },
//     approvedAt: { 
//         type: Date,
//          default: null 
//         }    
//   },
//   { timestamps: true }
// );


//  const Reservation =mongoose.models.Reservation || mongoose.model<IReservation>("Reservation", ReservationSchema);
//  export default Reservation;
import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  user?: mongoose.Types.ObjectId; // optional link to User
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

// Compound index to quickly query availability for a timeslot
ReservationSchema.index({ date: 1, time: 1 });

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

