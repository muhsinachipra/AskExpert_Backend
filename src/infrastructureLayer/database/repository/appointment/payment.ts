// backend\src\infrastructureLayer\database\repository\appointment\payment.ts

import AppointmentModel from "../../model/appointmentModel";

export const payment = async (
    appointmentId: string,
    transactionId: string,
    userId: string,
    userName: string,
    appointmentModel: typeof AppointmentModel
): Promise<string> => {
    try {
        const newAppointment = await appointmentModel.findOne({ _id: appointmentId })
        if (newAppointment) {
            newAppointment.userId = userId
            newAppointment.userName = userName
            newAppointment.paymentStatus = 'completed'
            newAppointment.paymentId = transactionId
            newAppointment.appointmentStatus = 'booked'
            await newAppointment.save()
            return "Payment completed successfully"
        } else {
            return "Appointment did'nt exist"
        }
    } catch (error) {
        throw error;
    }
};
