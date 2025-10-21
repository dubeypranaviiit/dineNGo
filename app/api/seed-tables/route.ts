import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Table from "@/database/models/table.modal"

export async function GET() {
  try {
    await dbConnect();

  
    const tables = Array.from({ length: 15 }, (_, i) => ({
      number: i + 1,
      seats: Math.floor(Math.random() * 6) + 2, // 2 to 7 seats
      status: ["available", "reserved", "maintenance"][Math.floor(Math.random() * 3)],
      location: {
        window: Math.random() > 0.5 ? "Yes" : "No",
        area: ["North", "South", "East", "West"][Math.floor(Math.random() * 4)],
        section: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
      },
    }));

    // Insert into DB
    await Table.insertMany(tables);

    return NextResponse.json({
      success: true,
      message: "15 tables seeded successfully!",
      tables,
    });
  } catch (error) {
    console.error("Error seeding tables:", error);
    return NextResponse.json({ success: false, message: "Failed to seed tables" }, { status: 500 });
  }
}
