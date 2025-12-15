// backend\src\domainLayer\appointment.ts

import { Types } from "mongoose";

export interface IAppointment {
    _id?: string
    userId?: Types.ObjectId | string;
    userName?: string;
    expertId: Types.ObjectId | string;
    expertName: string;
    expertCategory: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    paymentStatus: string;
    paymentId: string;
    appointmentStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}
