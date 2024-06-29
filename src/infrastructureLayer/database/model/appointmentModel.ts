// backend\src\infrastructureLayer\database\model\appointmentModel.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { IAppointment } from "../../../domainLayer/appointment";

const appointmentSchema: Schema = new Schema<IAppointment & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
        time: { type: String, required: true },
        price: { type: Number, required: true },
        paymentStatus: { type: String, default: 'pending' },
        paymentId: { type: String, default: '' },
        appointmentStatus: { type: String, default: 'pending' },
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
