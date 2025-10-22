// import { NextResponse } from "next/server";
// import {dbConnect} from "@/database/dbConnect";
// import Table from "@/database/models/table.modal";
// import Reservation from "@/database/models/reservation.modal";



// export async function GET(req: Request) {
//   try {
//     await dbConnect();
//     const url = new URL(req.url);
//     const date = url.searchParams.get("date");
//     const guests = parseInt(url.searchParams.get("guests") || "1");
//     const tableId = url.searchParams.get("tableId");

//     if (!date) return NextResponse.json({ error: "Date is required" }, { status: 400 });

   
//     const tableQuery: any = { status: "available", seats: { $gte: guests } };
//     if (tableId) tableQuery._id = tableId;
//     const tables = await Table.find(tableQuery).sort({ seats: 1 });
//    console.log(`tables:${tables}`);
   
//     const allTimes = [
//       "12:00 PM", "12:30 PM",
//       "1:00 PM", "1:30 PM",
//       "2:00 PM", "2:30 PM",
//       "3:00 PM", "3:30 PM",
//       "4:00 PM", "4:30 PM",
//       "5:00 PM", "5:30 PM",
//       "6:00 PM", "6:30 PM",
//       "7:00 PM", "7:30 PM",
//       "8:00 PM", "8:30 PM",
//       "9:00 PM", "9:30 PM",
//       "10:00 PM",
//     ];

//     let reservedTimes: string[] = [];
//     if (tableId) {
//       const reservations = await Reservation.find({ date, tableId });
//       reservedTimes = reservations.map(r => r.time);
//     }

    
//     const availableTimes = allTimes.filter(t => !reservedTimes.includes(t));

//     return NextResponse.json({ tables, availableTimes });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Reservation from "@/database/models/reservation.modal";
import Table from "@/database/models/table.modal";
import { Types } from "mongoose";

interface TableType {
  _id: Types.ObjectId;
  seats: number;
  status?: string;
}

interface ReservationType {
  _id: Types.ObjectId;
  tableId: Types.ObjectId;
  date: string;
  time: string;
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const guests = Number(searchParams.get("guests")) || 1;

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const tables = (await Table.find({ seats: { $gte: guests } }).lean()) as unknown as TableType[];
   const reservations = (await Reservation.find({ date }).lean()) as unknown as ReservationType[];


    //  Define all possible time slots
    const allTimes = [
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
    ];

    // 4️⃣ Find times that still have at least one free table
    const availableTimes = allTimes.filter((time) => {
      const bookedTables = reservations
        .filter((r) => r.time === time)
        .map((r) => r.tableId.toString());

      const freeTables = tables.filter(
        (t) => !bookedTables.includes(t._id.toString())
      );

      return freeTables.length > 0;
    });

    // 5️⃣ Return all free tables
    const bookedIds = reservations.map((r) => r.tableId.toString());
    const availableTables = tables.filter(
      (t) => !bookedIds.includes(t._id.toString())
    );

    return NextResponse.json({
      availableTables,
      availableTimes,
    });
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
