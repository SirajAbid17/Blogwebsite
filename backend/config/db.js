import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const dbconnect=async ()=>{
    try{
        await mongoose.connect(process.env.URL)
console.log('mongodb connected')
    }
    catch(e){
        console.log('mongodb is not connect')
    }
}

export default dbconnect;