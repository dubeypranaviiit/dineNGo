import { buffer } from "micro";
import Stripe from "stripe";
import Payment from "@/database/models/payment.modal";
import Reservation from "@/database/models/reservation.modal";
import { dbConnect } from "@/database/dbConnect";
export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export default async function handler(req: any, res: any) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.log("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await dbConnect();

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const paymentDoc = await Payment.findOne({ paymentIntentId: paymentIntent.id });
    if (paymentDoc) {
      paymentDoc.paymentStatus = "succeeded";
      await paymentDoc.save();
      const reservation = await Reservation.findById(paymentDoc.reservationId);
      if (reservation) {
        reservation.isConfirmed = true;
        await reservation.save();
      }
    }
  }

  res.json({ received: true });
}
