import mongoose from "mongoose";
import { DB_name } from "./constants.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
            dbName: DB_name,
        });
        console.log("Connected to MongoDB");
        return connectionInstance;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    }
};

export default connectDB;