// backend\src\infrastructureLayer\database\model\expertModel.ts

import mongoose, { Document, Model, Schema } from "mongoose"
import { IExpert } from "../../../domainLayer/expert"

const expertSchema: Schema = new Schema<IExpert & Document>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        experience: { type: Number, required: true, default: 0 },
        profilePic: { type: String, required: true },
        resume: { type: String, required: true },
        rate: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        walllet: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
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