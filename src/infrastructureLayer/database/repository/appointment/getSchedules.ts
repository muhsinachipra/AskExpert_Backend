// backend\src\infrastructureLayer\database\repository\appointment\getSchedules.ts

import AppointmentModel from "../../model/appointmentModel";

export const getSchedules = async (expertId: string, appointmentModel: typeof AppointmentModel) => {
    try {
        const appointmentData = await appointmentModel.find().sort({ createdAt: -1 });
        return appointmentData
    } catch (error) {
        throw error;
    }
};