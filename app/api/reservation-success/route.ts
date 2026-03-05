import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import { stripe } from "@/lib/stripe";
import Reservation from "@/database/models/reservation.modal";
import Payment from "@/database/models/payment.modal";
import Table from "@/database/models/table.modal";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { error: "Session ID missing" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const meta = session.metadata;

    if (!meta) {
      return NextResponse.json(
        { error: "Metadata missing" },
        { status: 400 }
      );
    }

    const { reservationId } = meta;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    if (reservation.isConfirmed) {
      return NextResponse.json({
        message: "Reservation already confirmed",
        reservation,
      });
    }

    const table = await Table.findById(reservation.tableId);

    if (!table) {
      return NextResponse.json(
        { error: "Table not found" },
        { status: 404 }
      );
    }

    reservation.isConfirmed = true;
    reservation.paymentStatus = "paid";
    await reservation.save();

    const existingPayment = await Payment.findOne({
      reservationId: reservation._id,
    });

    if (!existingPayment) {
      await Payment.create({
        reservationId: reservation._id,
        amount: session.amount_total! / 100,
        currency: "inr",
        paymentIntentId: session.payment_intent as string,
        paymentStatus: "succeeded",
      });
    }

  
    table.status = "maintenance"; 
    await table.save();

    return NextResponse.json({
      message: "Reservation confirmed successfully",
      reservation,
    });

  } catch (err: any) {
    console.error("Reservation success error:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}