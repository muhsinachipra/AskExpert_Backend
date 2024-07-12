// backend\src\usecaseLayer\usecase\admin\updateExpertBlockedStatus.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";

export const updateExpertBlockedStatus = async (
    expertId: string,
    requestValidator: IRequestValidator,
    expertRepository: IExpertRepository
): Promise<IResponse> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { expertId },
            ['expertId']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const data = await expertRepository.updateExpertBlockedStatus(expertId);
        if (data) {
            return {
                success: true,
                data,
                message: 'Expert block status updated successfully',
                status: 200,
            };
        }
        return {
            success: false,
            data: null,
            message: 'Expert not found',
            status: 404,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to update expert block status',
            status: 500,
        };
    }
}