// backend\src\infrastructureLayer\database\repository\appointment\findAppointmentByTimeAndExpert.ts

import { IAppointment } from "../../../../domainLayer/appointment";
import AppointmentModel from "../../model/appointmentModel";

export const findAppointmentByTimeAndExpert = async (
    date: string,
    startTime: string,
    expertId: string,
    appointmentModel: typeof AppointmentModel,
): Promise<IAppointment | null> => {
    try {
        const appointment = await appointmentModel.findOne({ date, startTime, expertId });
        console.log(`Appointment in the findAppointmentByTimeAndExpert repository : `, appointment)
        return appointment
    } catch (error) {
        console.error('Error finding appointment by Time and expertId:', error);
        throw error;
    }
};
