// backend\src\domainLayer\appointment.ts

import { Types } from "mongoose";

export interface IAppointment {
    _id?: string
    userId?: Types.ObjectId | string;
    expertId: Types.ObjectId | string;
    time: string;
    price: number;
    paymentStatus: string;
    paymentId: string;
    appointmentStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}