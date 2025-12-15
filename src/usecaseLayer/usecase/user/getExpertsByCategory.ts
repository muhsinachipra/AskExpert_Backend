// backend\src\usecaseLayer\usecase\user\getExpertsByCategory.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getExpertsByCategory = async (
    categoryName: string, requestValidator: IRequestValidator, expertRepository: IExpertRepository
): Promise<IResponse> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { categoryName },
            ["categoryName"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const { data, total } = await expertRepository.getExpertsByCategory(categoryName);
        
        return {
            success: true,
            data,
            total,
            message: 'Expert data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve expert data',
            status: 500,
        };
    }
}
