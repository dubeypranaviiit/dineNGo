import Item from "@/database/models/item.modal";
import {dbConnect} from "@/database/dbConnect";
import { NextResponse } from "next/server";

import { writeFile } from 'fs/promises';


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
    console.log(`Api  request come`);
    await dbConnect();
    try{
    
    const formData = await req.formData();
    const timestamp = Date.now();
    console.log(formData,":formData");
    
    const image = formData.getAll('image').find(file => file instanceof File);

    if (!image) {
        return NextResponse.json({ error: 'No image file provided' },{status:504});
    }
  
    const  imageBiteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageBiteData)
    const path =`./public/${timestamp}_${image.name}`;
     await writeFile(path,buffer);
     const imageUrl = `/${timestamp}_${image.name}`
     console.log(`${imageUrl}`);

     const ItemData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        diet: formData.get('diet') as string,
        price: Number(formData.get('price')), 
        description: formData.get('description') as string,
        image: imageUrl, 
        isSpecial: formData.get('isSpecial') === 'true',
    };
    
 await Item.create(ItemData);
 console.log(`item Saved`);

     return NextResponse.json({
        success:true,
        message:`Saved in Database`
     })
    }catch(error){
        console.log(error);
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