import { NextResponse } from "next/server";
import Item from "@/database/models/item.modal";
import { dbConnect } from "@/database/dbConnect";

const items = [
  {
    _id: "1",
    name: "Paneer Butter Masala",
    category: "Main Course",
    diet: "veg",
    price: 350,
    description: "Soft paneer cubes simmered in a buttery tomato gravy.",
    image: "/images/food/paneer-butter-masala.jpg",
    isSpecial: true,
  },
  {
    _id: "2",
    name: "Butter Chicken",
    category: "Main Course",
    diet: "non-veg",
    price: 420,
    description: "Tender chicken cooked in rich buttery tomato gravy.",
    image: "/images/food/butter-chicken.jpg",
    isSpecial: true,
  },
  {
    _id: "3",
    name: "Tandoori Chicken",
    category: "Main Course",
    diet: "non-veg",
    price: 480,
    description: "Spicy roasted chicken marinated in yogurt and spices.",
    image: "/images/food/tandoori-chicken.jpg",
    isSpecial: false,
  },
  {
    _id: "4",
    name: "Chole Bhature",
    category: "Main Course",
    diet: "veg",
    price: 250,
    description: "Spicy chickpeas served with deep-fried bread.",
    image: "/images/food/chole-bhature.jpg",
    isSpecial: false,
  },

 
];

export async function GET() {
  try {
    await dbConnect();

    // Delete old items if needed
    await Item.deleteMany({});

    // Insert new items
    await Item.insertMany(items);
  //  await Item.insertMany(moreItems);
    return NextResponse.json({ success: true, message: "Items seeded successfully!" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, message: "Seeding failed." }, { status: 500 });
  }
}
