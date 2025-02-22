import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface
export interface IReservation extends Document {
  name: string;
  email: string;
  date: Date;
  phone: number;
  time: string;
  guests:number,
  isConfirmed:boolean,
  approvedBy:string,
  approvedAt:Date
}
const ReservationSchema: Schema = new Schema(
  {
    name: {
         type: String,
         required: true
         },
    email: {
         type: String, 
         required: true
         },
    phone: { 
        type: Number, 
        required: true
     },
     date: {
          type: Date,
          required: true 
          },
    time: { 
        type: String, 
        required: true 
    },
 
    guests: {
         type: Number,
         min: 1,
         max: 30,
         default: 1,
         },
     isConfirmed:{
        type:Boolean,
        default:false
     },
     approvedBy: { 
        type: String, 
        default: null 
    }, // Stores Admin ID or name
    approvedAt: { 
        type: Date,
         default: null 
        }    
  },
  { timestamps: true }
);


 const Reservation =mongoose.models.Reservation || mongoose.model<IReservation>("Reservation", ReservationSchema);
 export default Reservation;

//  
//    
    // id: 1,
    // name: "Garden Fresh Salad",
    // category: "appetizers",
    // diet: "veg",
    // price: 12.99,
    // description: "Crispy lettuce, cherry tomatoes, cucumber with house dressing",
    // image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    // isSpecial: true
  
//  