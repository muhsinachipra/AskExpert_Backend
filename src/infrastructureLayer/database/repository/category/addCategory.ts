// backend\src\infrastructureLayer\database\repository\category\addCategory.ts

import { ICategory } from '../../../../domainLayer/category'
import CategoryModel from '../../model/categoryModel'

export const addCategory = async (
    newCategory: ICategory,
    categoryModel: typeof CategoryModel
): Promise<ICategory> => {
    try {
        const createdCategory = new categoryModel(newCategory);
        await createdCategory.save();
        return createdCategory;
    }
    catch (error) {
        throw error
    }
}
