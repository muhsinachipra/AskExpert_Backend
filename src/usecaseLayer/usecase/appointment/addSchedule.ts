import { RRule } from 'rrule';
import { IAppointment } from "../../../domainLayer/appointment";
import { IExpert } from "../../../domainLayer/expert";
import ErrorResponse from "../../handler/errorResponse";
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const addSchedule = async (
    scheduleData: { date: string, startTime: string, rrule: string },
    expertData: IExpert,
    requestValidator: IRequestValidator,
    appointmentRepository: IAppointmentRepository,
) => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { scheduleData, expertData },
            ['scheduleData', 'expertData']
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        // Combine date and time into a single Date object
        const appointmentDateTimeLocal = new Date(`${scheduleData.date}T${scheduleData.startTime}Z`); // Add 'Z' to indicate UTC time
        const currentDateTimeUTC = new Date();
        const currentDateTimeLocal = new Date(currentDateTimeUTC.getTime() - (currentDateTimeUTC.getTimezoneOffset() * 60000));

        // Check if the appointment date and time is in the past
        if (appointmentDateTimeLocal < currentDateTimeLocal) {
            throw ErrorResponse.badRequest("Cannot schedule an appointment in the past");
        }

        const rrule = RRule.fromString(scheduleData.rrule);
        const appointmentDates = rrule.all();

        for (const appointmentDate of appointmentDates) {
            const date = appointmentDate.toISOString().split('T')[0];
            const startTime = appointmentDate.toISOString().split('T')[1].split('.')[0];

            const existingAppointment = await appointmentRepository.findAppointmentByTimeAndExpert(
                date,
                startTime,
                expertData._id || ""
            );

            if (existingAppointment) {
                throw ErrorResponse.badRequest("Appointment already exists for " + appointmentDate);
            }

            const newAppointment = {
                date,
                startTime,
                expertId: expertData._id || "",
                expertName: expertData.name || "",
                expertCategory: expertData.category || "",
                price: expertData.rate,
            };

            await appointmentRepository.addSchedule(newAppointment);
        }

        return {
            status: 200,
            success: true,
            message: "Successfully created",
        };
    } catch (error) {
        console.error('Error creating Appointment:', error);
        throw error;
    }
};
