// backend\src\usecaseLayer\usecase\admin\getCategories.ts

import { ICategoryRepository } from "../../interface/repository/ICategoryRepository";
import { IResponse, IUseCaseResponse } from "../../interface/services/IResponse";

export const getCategories = async (page: number, limit: number, categoryRepository: ICategoryRepository): Promise<IUseCaseResponse> => {
    try {
        const { data, total } = await categoryRepository.getCategories(page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Category data retrieved successfully',
        };
    } catch (error) {
        throw error;
    }
}
