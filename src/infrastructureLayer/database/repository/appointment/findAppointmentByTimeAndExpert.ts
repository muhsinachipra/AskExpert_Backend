// backend\src\infrastructureLayer\database\repository\appointment\findAppointmentByTimeAndExpert.ts

import { IAppointment } from "../../../../domainLayer/appointment";
import AppointmentModel from "../../model/appointmentModel";

export const findAppointmentByTimeAndExpert = async (
    date: string,
    time: string,
    expertId: string,
    appointmentModel: typeof AppointmentModel,
): Promise<IAppointment | null> => {
    try {
        const appointment = await appointmentModel.findOne({ date, time, expertId });
        console.log(`Appointment in the findAppointmentByTimeAndExpert repository : `, appointment)
        return appointment
    } catch (error) {
        console.error('Error finding appointment by time and expertId:', error);
        throw error;
    }
};
