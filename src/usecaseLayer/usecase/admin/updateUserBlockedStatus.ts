// backend\src\usecaseLayer\usecase\admin\updateUserBlockedStatus.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";

export const updateUserBlockedStatus = async (
    userId: string,
    requestValidator: IRequestValidator,
    userRepository: IUserRepository
): Promise<IResponse> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { userId },
            ['userId']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const data = await userRepository.updateUserBlockedStatus(userId);
        if (data) {
            return {
                success: true,
                data,
                message: 'User block status updated successfully',
                status: 200,
            };
        }
        return {
            success: false,
            data: null,
            message: 'User not found',
            status: 404,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to update user block status',
            status: 500,
        };
    }
}