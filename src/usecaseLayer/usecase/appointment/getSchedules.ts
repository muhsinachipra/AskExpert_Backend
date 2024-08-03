// backend\src\usecaseLayer\usecase\appointment\getSchedules.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getSchedules = async (
    expertId: string,
    page: number,
    limit: number,
    appointmentRepository: IAppointmentRepository
): Promise<IResponse> => {
    try {
        const { data, total } = await appointmentRepository.getSchedules(expertId, page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Appointment data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        throw (error)
    }
}
