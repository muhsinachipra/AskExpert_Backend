// backend\src\infrastructureLayer\database\repository\category\getCategories.ts

import CategoryModel from "../../model/categoryModel";

export const getCategories = async (page: number, limit: number, categoryModel: typeof CategoryModel) => {
    try {
        const skip = (page - 1) * limit;
        const categoryData = await categoryModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await categoryModel.countDocuments();
        return { data: categoryData, total };
    } catch (error) {
        throw error;
    }
};