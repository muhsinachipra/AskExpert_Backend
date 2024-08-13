// backend\src\infrastructureLayer\config\db.ts

import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_URI: string = process.env.MONGO_URI || '';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`DB connected: ${mongoose.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`DB connection error: ${error.message}`);
        } else {
            console.error('An unknown error occurred during DB connection.');
        }
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;
