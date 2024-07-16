// backend\src\domainLayer\expert.ts

// import { Types } from "mongoose";

export interface IExpert {
    _id?: string
    name: string
    email: string;
    password: string;
    // category: Types.ObjectId;
    category: string;
    experience: number;
    profilePic: string;
    resume: string;
    mobile?: string;
    wallet?: number;
    rating?: number;
    isVerified?: boolean
    isBlocked?: boolean
    createdAt?: Date
}