// backend\src\usecaseLayer\usecase\appointment\getExpertSlots.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";
import ErrorResponse from "../../handler/errorResponse";

export const getExpertSlots = async (
    expertId: string,
    requestValidator: IRequestValidator,
    appointmentRepository: IAppointmentRepository,
): Promise<IResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { expertId },
            ["expertId"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const data = await appointmentRepository.getSchedules(expertId);
        return {
            success: true,
            data,
            message: 'Expert slots retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve expert slots',
            status: 500,
        };
    }
}