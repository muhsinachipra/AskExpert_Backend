// backend\src\usecaseLayer\usecase\user\getExpertsByCategory.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse, IUseCaseResponse } from "../../interface/services/IResponse";

export const getExpertsByCategory = async (
    categoryName: string, requestValidator: IRequestValidator, expertRepository: IExpertRepository
): Promise<IUseCaseResponse> => {
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
        };
    } catch (error) {
        throw error;
    }
}
