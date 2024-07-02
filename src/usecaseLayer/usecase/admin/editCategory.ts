// backend\src\usecaseLayer\usecase\admin\editCategory.ts

import { ICategory } from "../../../domainLayer/category";
import ErrorResponse from "../../handler/errorResponse";
import { ICategoryRepository } from "../../interface/repository/ICategoryRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const editCategory = async (
    updatedCategory: ICategory,
    requestValidator: IRequestValidator,
    categoryRepository: ICategoryRepository,
) => {
    try {
        const { _id, categoryImage, categoryName, categoryDescription } = updatedCategory
        const validation = requestValidator.validateRequiredFields(
            { _id, categoryImage, categoryName, categoryDescription },
            ['_id', 'categoryImage', 'categoryName', 'categoryDescription']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const existingCategory = await categoryRepository.getCategoryById(_id);

        if (!existingCategory) {
            throw ErrorResponse.notFound("Category not found");
        }

        await categoryRepository.editCategory(updatedCategory);

        return {
            status: 200,
            success: true,
            message: "Category updated successfully",
        };

    } catch (error) {
        console.error('Error editing Category:', error);
        throw error;
    }
}