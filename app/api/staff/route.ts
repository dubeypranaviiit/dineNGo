import Staff from "@/database/models/staff.modal";
import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
export async function GET(){
   await dbConnect();
    try{
        console.log('request came for get');
        const staff = await Staff.find({});
        console.log(staff);
         return NextResponse.json({
            success:true,
            message:`Successfully data fetched`,
            staff
         })
    }catch(error){
        console.log(`Error while getting staff:${error}`);
        return NextResponse.json({
            success:false,
            message:`Something went wrong,please try again later`
        },{status:500})
    }
}
export async function POST(req:Request){
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
        const staffData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            role:formData.get('role') as string, 
            employeeId:formData.get('employeeId') as string,
            specialization:formData.get('specialization') as string,
            status:formData.get('status') as string,
            image: imageUrl, 
        };
        
         await Staff.create(staffData);
        console.log(`staff Saved`);
    
         return NextResponse.json({
            success:true,
            message:`Saved in Database`
         })
    }catch(error){
        console.log(`Error while saving data in db:${error}`);
        return NextResponse.json({
            success:false,
            message:`Something went wrong,please try again later`
        },{status:500})
    }

}
// export async function DELETE(staffId:string) {
//      await dbConnect();
//      try{
//         // const staffId = req.json();
//         await Staff.findByIdAndDelete(staffId);
//         return NextResponse.json({
//             success:true,
//             message:`Staff deleted successfully`
//         })
//      }catch(error){
//         console.log(`Error while deleting data:${error}`);
//         return NextResponse.json({
//             success:false,
//             message:`Something went wrong please try again later`
//         })
//      }
// }
export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { staffId } = await req.json(); // extract staffId from request body

    if (!staffId) {
      return NextResponse.json({
        success: false,
        message: "staffId is required",
      }, { status: 400 });
    }

    await Staff.findByIdAndDelete(staffId);

    return NextResponse.json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    console.log(`Error while deleting data: ${error}`);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again later",
    }, { status: 500 });
  }
}

export async function PUT(req:Request) {
    await dbConnect();
    console.log(`request came`);
    try{
        console.log(`request came`);
        const formData = await req.formData();
        const userId =    formData.get('id') as string 
        // formData.get('id') as string 
        console.log(`🟡 Received userId:`, userId, `| Type:`, typeof userId);
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)){
            console.log(`🟡 Received userId:`, userId, `| Type:`, typeof userId,userId.length);
            return NextResponse.json({
                success:false,
                message:`Something went wrong`
            },{status:404})
        }
        const updatedStaffData = {
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            role:formData.get('role') as string, 
            status:formData.get('status') as string,
           
        };
        console.log(updatedStaffData);
     const staffData = await Staff.findByIdAndUpdate(userId,updatedStaffData ,{new:true}) 
     
     return NextResponse.json({
        success:true,
        message:`Staff updated successfully`,
       staffData
     })
    }catch(error){
        console.log(`Error while  updating:${error}`);
        return NextResponse.json({
            success:false,
            message:`Something went wrong`
        })
    }
    
}