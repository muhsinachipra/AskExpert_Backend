// backend\src\infrastructureLayer\database\repository\admin\addCategory.ts

import { ICategory } from '../../../../domainLayer/category'
import CategoryModel from '../../model/categoryModel'

export const addCategory = async (
    newCategory: ICategory,
    categoryModel: typeof CategoryModel
): Promise<ICategory> => {
    try {
        // const existingCategory = await categoryModel.findOne({ categoryName: newCategory.categoryName });

        // if (existingCategory) {
        //     throw new Error("Category already exists");
        // }

        const createdCategory = new categoryModel(newCategory);
        await createdCategory.save();
        return createdCategory;
    }
    catch (error) {
        throw error
    }
}
