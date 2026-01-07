import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/database/dbConnect";
import Reservation from "@/database/models/reservation.modal";
import Table from "@/database/models/table.modal";
import User from "@/database/models/user.modal";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();
    const { name, email, phone, date, time, guests, tableId } = data;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let assignedTableId = tableId;
    if (!assignedTableId) {
      const availableTable = await Table.findOne({ status: "available", seats: { $gte: guests } })
        .sort({ seats: 1 });
      if (!availableTable)
        return NextResponse.json(
          { error: "No available tables for selected time" },
          { status: 400 }
        );
      assignedTableId = availableTable._id.toString();
    }

    const existing = await Reservation.findOne({ date, time, tableId: assignedTableId });
    if (existing) {
      return NextResponse.json(
        { error: "This table is already booked for this time" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    const reservation = await Reservation.create({
      user: user?._id || null,
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableId: assignedTableId,
      paymentStatus: "pending",
      isConfirmed: false,
    });
     
 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Table Reservation for ${date} at ${time}` },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/reservation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/reservation-cancel`,
      metadata: {
        reservationId: reservation._id.toString(),
        name,
        email,
        phone,
        date,
        time,
        guests,
        tableId: assignedTableId,
        amount:500
      },
    });

    reservation.stripeSessionId = session.id;
    await reservation.save();

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Reservation creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ message: "Missing clerkId" }, { status: 400 });
    }

    const dbUser = await User.findOne({ clerkUserId: clerkId });
    if (!dbUser) {
      console.log('user not found');
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const reservations = await Reservation.find({ user: dbUser._id }).sort({ createdAt: -1 });

    return NextResponse.json({ reservations }, { status: 200 });
  } catch (err: any) {
    console.error("Fetch reservations error:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}


