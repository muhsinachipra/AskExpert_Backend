// backend\src\usecaseLayer\usecase\appointment\addSchedule.ts

import { IAppointment } from "../../../domainLayer/appointment";
import { IExpert } from "../../../domainLayer/expert";
import ErrorResponse from "../../handler/errorResponse";
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const addSchedule = async (
    scheduleData: { time: string },
    expertData: IExpert,
    requestValidator: IRequestValidator,
    appointmentRepository: IAppointmentRepository,
) => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { scheduleData, expertData },
            ['scheduleData', 'expertData']
        )
        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }
        const existingAppointment = await appointmentRepository.findAppointmentByTimeAndExpert(
            scheduleData.time,
            expertData._id || ""
        );

        if (existingAppointment) {
            throw ErrorResponse.badRequest("Appointment already exists")
        }

        const newAppointment = {
            time: scheduleData.time,
            expertId: expertData._id || "",
            price: expertData.rate
        }

        await appointmentRepository.addSchedule(newAppointment);

        return {
            status: 200,
            success: true,
            message: "Successfully created"
        }
    } catch (error) {
        console.error('Error creating Appointment:', error);
        throw error;
    }
}