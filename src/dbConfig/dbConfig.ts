import { error } from "console";
import mongoose from "mongoose";

export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('Database connected successfully.')
        })

        connection.on('error', (err)=>{
            console.log('MongoDB connection error.' + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong, database couldn't be connected.");
        console.log(error);
    }
}