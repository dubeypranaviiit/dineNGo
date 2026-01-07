import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect";
import Table from "@/database/models/table.modal";
export async function DELETE(req: NextRequest, context: any) {
  try {
    await dbConnect();
    const { id } = context.params; // Access params here

    if (!id) {
      return NextResponse.json({ error: "Table ID is required" }, { status: 400 });
    }

    const deleted = await Table.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Table deleted successfully" });
  } catch (err: any) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete table" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    await dbConnect();
    const { id } = context.params; // Access params here

    if (!id) {
      return NextResponse.json({ error: "Table ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { number, seats, status, location } = body;

    if (!number || !seats) {
      return NextResponse.json(
        { error: "Number and seats are required" },
        { status: 400 }
      );
    }

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { number, seats, status, location },
      { new: true }
    );

    if (!updatedTable) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, table: updatedTable });
  } catch (err: any) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 });
  }
}
