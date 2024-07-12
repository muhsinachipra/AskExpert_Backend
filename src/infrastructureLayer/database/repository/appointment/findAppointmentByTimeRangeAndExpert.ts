// backend\src\infrastructureLayer\database\repository\appointment\findAppointmentByTimeRangeAndExpert.ts

import { IAppointment } from "../../../../domainLayer/appointment";
import AppointmentModel from "../../model/appointmentModel";

// New method to check for time range conflicts
export const findAppointmentByTimeRangeAndExpert = async (
    date: string,
    startTime: string,
    endTime: string,
    expertId: string,
    appointmentModel: typeof AppointmentModel,
): Promise<IAppointment | null> => {

    const now = new Date();
    const localTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));


    try {
        const appointment = await appointmentModel.findOne({
            date,
            expertId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lt: startTime }, endTime: { $gt: endTime } }
            ]
        });
        console.log(`Appointment in the findAppointmentByTimeRangeAndExpert repository : `, appointment)

        // Check if the appointment startTime is in the past and the appointmentStatus is pending
        if (appointment) {
            const appointmentStartTime = new Date(`${appointment.date}T${appointment.startTime}Z`);
            if (appointmentStartTime < localTime && appointment.appointmentStatus === 'pending') {
                return null;
            }
        }

        return appointment;
    } catch (error) {
        console.error('Error finding appointment by Time range and expertId:', error);
        throw error;
    }
};