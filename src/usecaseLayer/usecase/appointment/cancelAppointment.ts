// backend\src\usecaseLayer\usecase\appointment\cancelAppointment.ts

import ErrorResponse from '../../handler/errorResponse'
import { IAppointmentRepository } from '../../interface/repository/IAppointmentRepository'
import { IUserRepository } from '../../interface/repository/IUserRepository'
import { IRequestValidator } from '../../interface/repository/IValidateRepository'
import { IResponse } from "../../interface/services/IResponse"

export const cancelAppointment = async (
    requestValidator: IRequestValidator,
    appointmentRepository: IAppointmentRepository,
    userRepository: IUserRepository,
    appointmentId: string,
): Promise<IResponse> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { appointmentId },
            ['appointmentId']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const appointment = await appointmentRepository.getAppointmentById(appointmentId)
        if (!appointment) {
            throw ErrorResponse.notFound("Appointment not found")
        }

        if (appointment.paymentStatus === "pending") {
            throw ErrorResponse.badRequest("Appointment not booked")
        }
        if (appointment.appointmentStatus === "completed") {
            throw ErrorResponse.badRequest("Appointment already completed")
        }

        await userRepository.amountToWallet(appointment.userId?.toString() as string, appointment.price)

        await appointmentRepository.cancelAppointment(appointmentId)
        return {
            status: 200,
            success: true,
            message: "Appointment Cancelled Successfully"
        }
    } catch (err) {
        console.error('Error cancelling appointment: ', err);
        throw err
    }
}