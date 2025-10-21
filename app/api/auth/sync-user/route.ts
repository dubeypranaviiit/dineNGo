import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/user.modal";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    console.log("Sign-in sync request received");

    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

    const userId = user.id;

    await dbConnect();

    let dbUser = await User.findOne({ clerkUserId: userId });

    if (!dbUser) {
   
      const email = user.emailAddresses?.[0]?.emailAddress || "";
      const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || email.split("@")[0];
      const phone = user.phoneNumbers?.[0]?.phoneNumber || "";

      dbUser = await User.create({
        clerkUserId: userId,
        name,
        email,
        phone,
        role: "customer",
      });

      console.log(" User created on first sign-in (local):", email);
    } else {
      console.log("User already exists in DB:", dbUser.email);
    }

    return NextResponse.json({ success: true, user: dbUser });
  } catch (err) {
    console.error("Sign-in sync error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
