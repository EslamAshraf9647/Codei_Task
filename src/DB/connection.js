import mongoose from "mongoose";

export const database_connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.log("Database Connection Failed");
        
    }
}