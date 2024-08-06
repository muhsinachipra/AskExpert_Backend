// backend\src\infrastructureLayer\database\model\reportModel.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { IReport } from "../../../domainLayer/report";

const reportSchema: Schema = new Schema<IReport & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
        reason: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

const ReportModel: Model<IReport & Document> = mongoose.model<IReport & Document>(
    "Report",
    reportSchema
);

export default ReportModel;
