// backend\src\usecaseLayer\usecase\appointment\addSchedule.ts

import { RRule } from 'rrule';
import { IAppointment } from "../../../domainLayer/appointment";
import { IExpert } from "../../../domainLayer/expert";
import ErrorResponse from "../../handler/errorResponse";
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const addSchedule = async (
    // scheduleData: { date: string, startTime: string, rrule: string },
    scheduleData: Record<string, string>,
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
        const appointmentStartDateTimeLocal = new Date(`${scheduleData.date}T${scheduleData.startTime}Z`);
        const appointmentEndDateTimeLocal = new Date(`${scheduleData.date}T${scheduleData.endTime}Z`);
        const currentDateTimeUTC = new Date();
        const currentDateTimeLocal = new Date(currentDateTimeUTC.getTime() - (currentDateTimeUTC.getTimezoneOffset() * 60000));

        // Check if the endTime is actually greater than the startTime
        if (appointmentEndDateTimeLocal <= appointmentStartDateTimeLocal) {
            throw ErrorResponse.badRequest("End time must be greater than start time");
        }

        const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
        if (appointmentEndDateTimeLocal.getTime() - appointmentStartDateTimeLocal.getTime() < thirtyMinutesInMilliseconds) {
            throw ErrorResponse.badRequest("The time between start time and end time must be at least 30 minutes");
        }

        // Check if the appointment date and time is in the past
        if (appointmentStartDateTimeLocal < currentDateTimeLocal) {
            throw ErrorResponse.badRequest("Cannot schedule an appointment in the past");
        }


        const rrule = RRule.fromString(scheduleData.rrule);
        const appointmentDates = rrule.all();

        for (const appointmentDate of appointmentDates) {
            const date = appointmentDate.toISOString().split('T')[0];
            const startTime = appointmentDate.toISOString().split('T')[1].split('.')[0];
            const endTime = new Date(new Date(appointmentDate).setUTCHours(
                appointmentEndDateTimeLocal.getUTCHours(),
                appointmentEndDateTimeLocal.getUTCMinutes(),
                appointmentEndDateTimeLocal.getUTCSeconds()
            )).toISOString().split('T')[1].split('.')[0];
            console.log('endTime in the addSchedule usecase: ', endTime)
            console.log('startTime in the addSchedule usecase: ', startTime)

            const existingAppointment = await appointmentRepository.findAppointmentByTimeAndExpert(
                date,
                startTime,
                expertData._id || ""
            );
            const existInRangeAppointment = await appointmentRepository.findAppointmentByTimeRangeAndExpert(
                date,
                startTime,
                endTime,
                expertData._id || ""
            );
            // Check if any existing appointment interferes with the new appointment time range
            if (existingAppointment || existInRangeAppointment) {
                throw ErrorResponse.badRequest("Appointment already exists or conflicts with existing appointments");
                // throw ErrorResponse.badRequest("Appointment already exists or conflicts with existing appointments for " + appointmentDate);
            }

            const newAppointment: Partial<IAppointment> = {
                date,
                startTime,
                endTime,
                expertId: expertData._id || "",
                expertName: expertData.name || "",
                expertCategory: expertData.category || "",
                price: parseInt(scheduleData.price),
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
