// backend\src\infrastructureLayer\database\model\appointmentModel.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { IAppointment } from "../../../domainLayer/appointment";

const appointmentSchema: Schema = new Schema<IAppointment & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: { type: String, default: '' },
        expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
        expertName: { type: String, required: true },
        expertCategory: { type: String, required: true },
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        price: { type: Number, required: true },
        paymentStatus: { type: String, default: 'pending' },  // pending, completed, refunded
        paymentId: { type: String, default: '' },
        appointmentStatus: { type: String, default: 'pending' },  // pending, cancelled
    },
    {
        timestamps: true
    }
);

const AppointmentModel: Model<IAppointment & Document> = mongoose.model<IAppointment & Document>(
    "Appointment",
    appointmentSchema
);

export default AppointmentModel;
