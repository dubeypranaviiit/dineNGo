import { NextResponse } from "next/server";
import Item from "@/database/models/item.modal";
import { dbConnect } from "@/database/dbConnect";

export async function DELETE(req: Request, context:any
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
export async function PUT(req: Request, context: any) {
  try {
    await dbConnect();

    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
        image: body.image,
        isSpecial: body.isSpecial,
      },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });

  } catch (error) {
    console.error("Update error:", error);

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {

    await dbConnect();

    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Item ID is required" },
        { status: 400 }
      );
    }

    const item = await Item.findById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item,
    });

  } catch (error) {

    console.error("Error fetching item:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch item" },
      { status: 500 }
    );

  }
}