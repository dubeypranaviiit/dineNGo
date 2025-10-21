import { NextResponse } from "next/server";
import {dbConnect} from "@/database/dbConnect";
import Table from "@/database/models/table.modal";
import Reservation from "@/database/models/reservation.modal";



export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const date = url.searchParams.get("date");
    const guests = parseInt(url.searchParams.get("guests") || "1");
    const tableId = url.searchParams.get("tableId");

    if (!date) return NextResponse.json({ error: "Date is required" }, { status: 400 });

   
    const tableQuery: any = { status: "available", seats: { $gte: guests } };
    if (tableId) tableQuery._id = tableId;
    const tables = await Table.find(tableQuery).sort({ seats: 1 });
   console.log(`tables:${tables}`);
   
    const allTimes = [
      "12:00 PM", "12:30 PM",
      "1:00 PM", "1:30 PM",
      "2:00 PM", "2:30 PM",
      "3:00 PM", "3:30 PM",
      "4:00 PM", "4:30 PM",
      "5:00 PM", "5:30 PM",
      "6:00 PM", "6:30 PM",
      "7:00 PM", "7:30 PM",
      "8:00 PM", "8:30 PM",
      "9:00 PM", "9:30 PM",
      "10:00 PM",
    ];

    let reservedTimes: string[] = [];
    if (tableId) {
      const reservations = await Reservation.find({ date, tableId });
      reservedTimes = reservations.map(r => r.time);
    }

    
    const availableTimes = allTimes.filter(t => !reservedTimes.includes(t));

    return NextResponse.json({ tables, availableTimes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
