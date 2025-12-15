// backend\src\infrastructureLayer\database\repository\category\getCategoryById.ts

import { ICategory } from "../../../../domainLayer/category";
import CategoryModel from "../../model/categoryModel";

export const getCategoryById = async (
    _id: string,
    categoryModel: typeof CategoryModel
): Promise<ICategory | null> => {
    try {
        const category = await categoryModel.findById(_id).exec();
        return category;
    } catch (error) {
        console.error('Error finding category by ID:', error);
        throw error;
    }
};
