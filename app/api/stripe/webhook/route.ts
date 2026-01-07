import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/database/dbConnect";
import Reservation from "@/database/models/reservation.modal";
import Table from "@/database/models/table.modal";
import Payment from "@/database/models/payment.modal";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // Get raw body (arrayBuffer) instead of micro.buffer
    const rawBody = await req.arrayBuffer();
    const buf = Buffer.from(rawBody);

    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await dbConnect();

      const reservation = await Reservation.findOneAndUpdate(
        { stripeSessionId: session.id },
        { isConfirmed: true, paymentStatus: "paid" },
        { new: true }
      );

      if (reservation?.tableId) {
        await Table.findByIdAndUpdate(reservation.tableId, { status: "reserved" });
      }

      await Payment.create({
        reservationId: reservation!._id,
        amount: session.amount_total! / 100,
        currency: session.currency,
        paymentIntentId: session.payment_intent as string,
        paymentStatus: "succeeded",
        paymentMethod: "card",
      });

      console.log("Reservation confirmed:", reservation?._id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



