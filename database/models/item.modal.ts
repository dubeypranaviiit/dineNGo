import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  category: string;
  diet: string;
  price: number;
  description: string;
  image: string;
  isSpecial: boolean;
}
const ItemSchema: Schema = new Schema(
  {
    name: {
         type: String,
         required: true
         },
    category: {
         type: String, 
         required: true
         },
    diet: { 
        type: String, 
        required: true
     },
    price: {
          type: Number,
          required: true 
          },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
         type: String,
         required: true
         },
    isSpecial: {
         type: Boolean,
          default: false
         },
  },
  { timestamps: true }
);


 const Item =mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
 export default Item;

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