import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async()=>{
    const mongoURI = process.env.MONGO_URI ; 

    if(!mongoURI){
        throw new Error("MONGO_URI is not defined");
    }

    try{
        await mongoose.connect(mongoURI);
        console.log("mongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed:",error);
        process.exit(1);
    }
};

export default connectDB;