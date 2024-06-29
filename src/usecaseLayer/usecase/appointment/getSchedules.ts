// backend\src\usecaseLayer\usecase\appointment\getSchedules.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getSchedules = async (expertId: string, appointmentRepository: IAppointmentRepository): Promise<IResponse> => {
    try {
        const data = await appointmentRepository.getSchedules(expertId);
        return {
            success: true,
            data,
            message: 'Appointment data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve appointment data',
            status: 500,
        };
    }
}
