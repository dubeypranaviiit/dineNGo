import { dbConnect } from "@/database/dbConnect";
import { NextResponse } from "next/server";
import Reservation from "@/database/models/reservation.modal";
export async function GET(){
    try{
      await  dbConnect();
        const reservationData = await Reservation.find({})
        return NextResponse.json({
            success:true,
            message:`successfully fetched reservation data`,
            reservationData
        },{status:200})
    }catch(error){
        console.log(`Error while getting reservation:${error}`);
        return NextResponse.json({
            success:false,
            message:`Something went wrong`
        },{status:500})
    }
}
export async function  PUT(req:Request){
    try{
       const data = await req.json();
       const {reservationId,isConfirmed} = data;
       if (!reservationId) {
        return NextResponse.json(
            { success: false, message: "Reservation ID is required." },
            { status: 400 }
        );
    }
       const reservation = (await Reservation.findByIdAndUpdate(reservationId, { isConfirmed },{new:true}))
       return NextResponse.json({
           success:true,
           message:`successfully fetched reservation data`,
           reservation
       },{status:200})
    }catch(error){
        console.log(`Error while updating data:${error}`);
        return NextResponse.json({
            success:false,
            message:'Something went wrong, please try again later'
        },{status:500})
    }

}
