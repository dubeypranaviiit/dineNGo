import Item from "@/database/models/item.model";
import {dbConnect} from "@/database/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    try{
        await dbConnect();
   const items  = await Item.find({});
   return NextResponse.json({
    success:true,
    items
   },{status:200})
    }catch(error){
        console.log(`Error:${error}`);
        return NextResponse.json({ message: "Error fetching items", error }, { status: 500 });
    }
}
export async function POST(req:Request){
try{
    await dbConnect();
    const data = await req.json();
    const newItem  = await Item.create(data);
    return NextResponse.json({
        success:true,
        newItem
    },{status:201})
}catch(err){
    console.log(err);
    return NextResponse.json({
        success:false,
        message:'please try again to add item'
    })
}
}
export async function PUT(req:Request) {
    try{
        await dbConnect();
        const { id, ...updateData } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Item ID is required" }, { status: 400 });
          }
       const updatedItem = await Item.findByIdAndUpdate(id,updateData,{new:true})   

    if (!updatedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
      }
      return NextResponse.json(updatedItem, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Error updating item", error }, { status: 500 });
    }
}
export async function DELETE(req:Request){
    try{
        const {id}= await req.json();
        await Item.findByIdAndDelete(id);
        return NextResponse.json({
            success:true,
            message:`Item deleted successfully`
        },{status:200})
    }catch(error){
        console.log(` please try again later to delete:${error}`);
        return NextResponse.json({
            success:false,
            message:`please try again later to delete`
        },{status:500})
    }
}