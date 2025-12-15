// backend\src\infrastructureLayer\database\model\reviewModel.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { IReview } from "../../../domainLayer/review";

const reviewSchema: Schema = new Schema<IReview & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
        appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        feedback: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

const ReviewModel: Model<IReview & Document> = mongoose.model<IReview & Document>(
    "Review",
    reviewSchema
);

export default ReviewModel;
