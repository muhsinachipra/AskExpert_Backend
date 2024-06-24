// backend\src\usecaseLayer\usecase\admin\editCategory.ts

import { ICategory } from "../../../domainLayer/category";
import CategoryModel from "../../../infrastructureLayer/database/model/categoryModel";
import ErrorResponse from "../../handler/errorResponse";
import { ICategoryRepository } from "../../interface/repository/ICategoryRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const editCategory = async (
    updatedCategory: ICategory,
    requestValidator: IRequestValidator,
    categoryRepository: ICategoryRepository,
) => {
    try {
        const { _id, categoryName, categoryDescription } = updatedCategory
        const validation = requestValidator.validateRequiredFields(
            { _id, categoryName, categoryDescription },
            ['_id', 'categoryName', 'categoryDescription']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const existingCategory = await categoryRepository.getCategoryById(_id);

        if (!existingCategory) {
            return {
                status: 404,
                success: false,
                message: "Category not found",
            };
        }

        console.log('updatedCategory in usecase admin editCategory : ',updatedCategory)

        await categoryRepository.editCategory(updatedCategory);

        return {
            status: 200,
            success: true,
            message: "Category updated successfully",
        };

    } catch (error) {
        console.error('Error creating Category:', error);
        throw error;
    }
}