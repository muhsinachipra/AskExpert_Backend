// backend\src\domainLayer\review.ts

import { Types } from "mongoose";

export interface IReview {
    _id?: string
    userId: Types.ObjectId | string;
    expertId: Types.ObjectId | string;
    appointmentId: Types.ObjectId | string;
    rating: number;
    feedback?: string;
    createdAt?: Date;
    updatedAt?: Date;
}