// backend\src\infrastructureLayer\database\model\expertModel.ts

import mongoose, { Document, Model, Schema } from "mongoose"
import { IExpert } from "../../../domainLayer/expert"

const expertSchema: Schema = new Schema<IExpert & Document>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        category: {
            // type: Schema.Types.ObjectId,
            type: String,
            ref: 'Category',
            required: true
        },
        experience: { type: Number, required: true, default: 0 },
        profilePic: { type: String, required: true },
        resume: { type: String, required: true },
        mobile: { type: String, required: true },
        averageRating: { type: Number, default: 0 },
        wallet: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
        reports: { type: Number, default: 0 },
    },
    {
        timestamps: true
    }
)

const ExpertModel: Model<IExpert & Document> = mongoose.model<IExpert & Document>(
    "Expert",
    expertSchema
)

export default ExpertModel
