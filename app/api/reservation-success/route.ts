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
    if (!session_id)
      return NextResponse.json({ error: "Session ID missing" }, { status: 400 });

  
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const meta = session.metadata;
    if (!meta)
      return NextResponse.json({ error: "Metadata missing" }, { status: 400 });

    const { reservationId, tableId, amount } = meta;

    const reservation = await Reservation.findById(reservationId);
    const table = await Table.findById(tableId);
    if (!reservation || !table) {
      return NextResponse.json({ error: "Reservation or table not found" }, { status: 404 });
    }

    
 reservation.isConfirmed = true;
reservation.paymentStatus = "paid"; 
await reservation.save();
   
    await Payment.create({
      reservationId: reservation._id,
      amount: parseInt(amount),
      currency: "inr",
      paymentIntentId: session.payment_intent as string,
      paymentStatus: "succeeded",
    });

    
    table.status = "reserved";
    await table.save();

    setTimeout(async () => {
      table.status = "available";
      await table.save();
    }, 60 * 60 * 1000);

    return NextResponse.json({ message: "Reservation confirmed", reservation });
  } catch (err: any) {
    console.error("Reservation success error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


