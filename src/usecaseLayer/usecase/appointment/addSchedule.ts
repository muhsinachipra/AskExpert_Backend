// backend\src\usecaseLayer\usecase\appointment\addSchedule.ts

import { IAppointment } from "../../../domainLayer/appointment";
import { IExpert } from "../../../domainLayer/expert";
import ErrorResponse from "../../handler/errorResponse";
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const addSchedule = async (
    scheduleData: { date: string, time: string },
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

        // Combine date and time into a single Date object
        const appointmentDateTime = new Date(`${scheduleData.date}T${scheduleData.time}`);
        const currentDateTime = new Date();

        // Check if the appointment date and time is in the past
        if (appointmentDateTime < currentDateTime) {
            throw ErrorResponse.badRequest("Cannot schedule an appointment in the past");
        }


        const existingAppointment = await appointmentRepository.findAppointmentByTimeAndExpert(
            scheduleData.date,
            scheduleData.time,
            expertData._id || ""
        );

        if (existingAppointment) {
            throw ErrorResponse.badRequest("Appointment already exists")
        }

        const newAppointment = {
            date: scheduleData.date,
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