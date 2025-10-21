import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Order from "@/database/models/order.modal"
import mongoose from "mongoose";
import User from "@/database/models/user.modal";
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { user, cartItems, totalAmount, pickupTime } = body;

    if (!user || !cartItems?.length || !totalAmount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      user: new mongoose.Types.ObjectId(user),
      cartItems,
      totalAmount,
      pickupTime,
      status: "placed",
    });

    return NextResponse.json(
      { message: "✅ Order placed successfully!", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");
    const status = searchParams.get("status"); 

    if (!clerkId) {
      return NextResponse.json({ message: "Missing clerkId" }, { status: 400 });
    }

    const dbUser = await User.findOne({ clerkUserId: clerkId });
    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let query: any = { user: dbUser._id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: any) {
    console.error("Fetch orders error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
