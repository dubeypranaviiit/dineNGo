import { NextRequest, NextResponse } from "next/server";
import Table from "@/database/models/table.modal";
import Reservation from "@/database/models/reservation.modal";
import { dbConnect } from "@/database/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    let tables;

    if (date && time) {
     
      const reservedTables = await Reservation.find({ date, time }).select("tableNumber");
      const reservedTableNumbers = reservedTables.map((r) => r.tableNumber);

      tables = await Table.find({
        number: { $nin: reservedTableNumbers },
        status: "available",
      });
    } else {
     
      tables = await Table.find();
    }

    return NextResponse.json({ success: true, tables });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch tables" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { number, seats, status, location } = body;

    if (!number || !seats) {
      return NextResponse.json({ error: "Number and seats are required" }, { status: 400 });
    }

    const newTable = await Table.create({ number, seats, status, location });
    return NextResponse.json({ success: true, table: newTable }, { status: 201 });
  } catch (err: any) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to add table" }, { status: 500 });
  }
}

