// backend\src\usecaseLayer\usecase\appointment\getExpertSlots.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";
import ErrorResponse from "../../handler/errorResponse";

export const getExpertSlots = async (
    expertId: string,
    page: number,
    limit: number,
    requestValidator: IRequestValidator,
    appointmentRepository: IAppointmentRepository,
): Promise<IResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { expertId, page, limit },
            ["expertId", "page", "limit"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const { data, total } = await appointmentRepository.getSchedules(expertId, page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Expert slots retrieved successfully',
            status: 200,
        };
    } catch (error) {
        throw error
    }
}