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

    const body = await req.json();

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      clerkId
    } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // find user from clerkId
    let userId = null;

    if (clerkId) {
      const dbUser = await User.findOne({ clerkUserId: clerkId });
      if (dbUser) {
        userId = dbUser._id;
      }
    }

    // find tables with enough seats
    const tables = await Table.find({
      status: "available",
      seats: { $gte: guests },
    }).sort({ seats: 1 });

    if (!tables.length) {
      return NextResponse.json(
        { error: "No tables available" },
        { status: 400 }
      );
    }

    let assignedTable = null;

    for (const table of tables) {
      const existing = await Reservation.findOne({
        date,
        time,
        tableId: table._id,
      });

      if (!existing) {
        assignedTable = table;
        break;
      }
    }

    if (!assignedTable) {
      return NextResponse.json(
        { error: "No tables available for this time slot" },
        { status: 400 }
      );
    }

    // create reservation
    const reservation = await Reservation.create({
      user: userId,
      name,
      email,
      phone,
      date,
      time,
      guests,
      tableId: assignedTable._id,
    });

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Restaurant Table Reservation",
            },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_URL}/reservation-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_URL}/reservation-cancel`,

      metadata: {
        reservationId: reservation._id.toString(),
      },
    });

    reservation.stripeSessionId = session.id;
    await reservation.save();

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reservation failed" },
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


