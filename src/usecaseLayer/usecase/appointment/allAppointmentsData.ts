// backend\src\usecaseLayer\usecase\appointment\allAppointmentsData.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IResponse } from "../../interface/services/IResponse";

export const allAppointmentsData = async (page: number, limit: number, appointmentRepository: IAppointmentRepository): Promise<IResponse> => {
    try {
        const { data, total } = await appointmentRepository.getAllAppointments(page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Appointment data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            total: 0,
            message: 'Failed to retrieve appointment data',
            status: 500,
        };
    }
}
