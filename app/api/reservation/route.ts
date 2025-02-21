import { NextResponse } from "next/server";
import { dbConnect } from "@/database/dbConnect"; // Ensure dbConnect is correctly set up
import Reservation from "@/database/models/reservation";// Import the Reservation model

export async function POST(req: Request) {
  try {
    await dbConnect(); 
    const data = await req.json();
    const { name, email, phone, date, time, guests } = data;
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    const newReservation = await Reservation.create(data);

    return NextResponse.json(
      { success: true, reservation: newReservation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create reservation. Try again later." },
      { status: 500 }
    );
  }
}
export async function GET(){
    try{
      await  dbConnect();
        const reservationData = (await Reservation.find({}).sort({ createdAt: -1 }).limit(20))
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