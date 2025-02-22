import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface
export interface IStaff extends Document {
  name: string;
  phone:string,
  email:string,
  role:string,
  image:string,
  status:string,
  rating:number,
  specialization:string,
  employeeId:string,
  dateJoined: Date;
}

// Create Mongoose schema
const staffSchema: Schema = new Schema(
  {
    name: {
         type: String,
         required: true
         },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    specialization:{
        type:String,
        required:true
    },
    employeeId:{
        type:String,
        required:true
    },
    dateJoined:{
        type:Date,
        default:Date.now()
    }
  },
  { timestamps: true }
);


 const Staff =mongoose.models.Staff || mongoose.model<IStaff>("Staff", staffSchema);
 export default Staff;

//  {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
//     name: "John Mitchell",
//     dateJoined: "2023-01-15",
//     role: "Chef",
//     phone: "+1 (555) 123-4567",
//     email: "john.m@restaurant.com",
//     status: "active",
//     specialization: "Italian Cuisine",
//     employeeId: "EMP001",
//     rating: 4.8,
//   },