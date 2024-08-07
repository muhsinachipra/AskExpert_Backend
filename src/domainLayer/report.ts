// backend\src\domainLayer\report.ts

import { Types } from "mongoose";

export interface IReport {
    _id?: string
    userId: Types.ObjectId | string;
    expertId: Types.ObjectId | string;
    reason: string;
    createdAt?: Date;
    updatedAt?: Date;
}
