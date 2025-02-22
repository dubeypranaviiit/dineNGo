import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL as string
if(!MONGODB_URL){
    throw new Error("Please define the Mongo env variable")
}
 export  const dbConnect = async()=>{
    mongoose.connect(MONGODB_URL).then(()=>{
        console.log(`Database connected successfully`);
    }).catch((error)=>{
        console.log(`Error while connecting to db , please try again later:${error}`);
    })
}
