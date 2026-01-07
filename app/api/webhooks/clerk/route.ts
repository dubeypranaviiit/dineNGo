import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/user.modal";

export async function POST(req: Request) {
  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse("Missing svix headers", { status: 400 });
    }

    const body = await req.text();
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    let event: { type: string; data: any };
    try {
      event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as { type: string; data: any };
    } catch (err) {
      console.error(" Clerk Webhook verification failed:", err);
      return new NextResponse("Invalid signature", { status: 400 });
    }

    await dbConnect();

    const { type, data } = event;

    if (type === "user.created") {
      const existing = await User.findOne({ clerkUserId: data.id });
      if (!existing) {
        await User.create({
          clerkUserId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.email_addresses[0]?.email_address?.split("@")[0],
          email: data.email_addresses?.[0]?.email_address || "",
          phone: data.phone_numbers?.[0]?.phone_number || "",
          role: "customer",
        });
        console.log(" User created via webhook:", data.email_addresses?.[0]?.email_address);
      }
    }

    if (type === "user.deleted") {
      await User.findOneAndDelete({ clerkUserId: data.id });
      console.log("🗑️ User deleted via webhook:", data.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}

