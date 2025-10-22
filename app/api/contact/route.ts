import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Contact from "@/database/models/contact.modal";
export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newContact = await Contact.create({ name, email, subject, message });
    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error(" Error submitting contact:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
