// backend\src\infrastructureLayer\database\repository\category\editCategory.ts

import { ICategory } from '../../../../domainLayer/category'
import CategoryModel from '../../model/categoryModel'

export const editCategory = async (
    updatedCategory: ICategory,
    categoryModel: typeof CategoryModel
): Promise<ICategory> => {
    try {
        console.log('updatedCategory in db repos category editCategory : ',updatedCategory)
        const category = await categoryModel.findOne({ _id: updatedCategory._id});
        if (category) {
            category.categoryName = updatedCategory.categoryName
            category.categoryDescription = updatedCategory.categoryDescription
            await category.save();
            return category;
        }
        throw new Error("Internal Server Error") 
    }
    catch (error) {
        throw error
    }
}
