import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Order from "@/database/models/order.modal";
import User from "@/database/models/user.modal";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ✅ Define a type for your cart item
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { clerkId, cartItems, totalAmount, pickupTime } = await req.json();

    if (!clerkId || !cartItems?.length || !totalAmount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (totalAmount < 50) {
      return NextResponse.json(
        { message: "Total amount must be at least ₹50 to process payment" },
        { status: 400 }
      );
    }

    const dbUser = await User.findOne({ clerkUserId: clerkId });
    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Type hint the parameter
    const formattedCartItems = (cartItems as CartItem[]).map((item) => {
      if (!item._id) {
        throw new Error("Cart item is missing _id");
      }
      return {
        itemId: item._id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: dbUser.email,
      line_items: formattedCartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?canceled=true`,
    });

    await Order.create({
      user: dbUser._id,
      cartItems: formattedCartItems,
      totalAmount,
      pickupTime,
      status: "placed",
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
