import { NextResponse } from "next/server";
import Item from "@/database/models/item.modal";
import { dbConnect } from "@/database/dbConnect";

export async function DELETE(req: Request, context:any
    // { params }: { params: { id: string } }
) {
  try { 
   await  dbConnect();
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

   

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Item deleted successfully", id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting item: ${error}`);
    return NextResponse.json(
      { success: false, message: "Please try again later to delete" },
      { status: 500 }
    );
  }
}
