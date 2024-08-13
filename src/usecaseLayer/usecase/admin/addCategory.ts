// backend\src\usecaseLayer\usecase\admin\addCategory.ts

import ErrorResponse from "../../handler/errorResponse";
import { ICategoryRepository } from "../../interface/repository/ICategoryRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const addCategory = async (
    categoryImage: string,
    categoryName: string,
    categoryDescription: string,
    requestValidator: IRequestValidator,
    categoryRepository: ICategoryRepository,
) => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { categoryImage, categoryName, categoryDescription },
            ['categoryImage', 'categoryName', 'categoryDescription']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const newCategory = { categoryImage, categoryName, categoryDescription }

        const existingCategory = await categoryRepository.findCategoryByName(newCategory.categoryName);

        if (existingCategory) {
            throw ErrorResponse.badRequest("Category already exists")
        }

        await categoryRepository.addCategory(newCategory)

        return {
            status: 200,
            success: true,
            message: "Successfully created"
        }
    } catch (error) {
        console.error('Error creating Category:', error);
        throw error;
    }
}