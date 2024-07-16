// backend\src\usecaseLayer\usecase\admin\getCategories.ts

import { ICategoryRepository } from "../../interface/repository/ICategoryRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getCategories = async (page: number, limit: number, categoryRepository: ICategoryRepository): Promise<IResponse> => {
    try {
        const { data, total } = await categoryRepository.getCategories(page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Category data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve category data',
            status: 500,
        };
    }
}
