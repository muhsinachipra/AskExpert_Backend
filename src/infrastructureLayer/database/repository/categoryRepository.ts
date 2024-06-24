// backend\src\infrastructureLayer\database\repository\categoryRepository.ts

import { ICategory } from "../../../domainLayer/category";
import { ICategoryRepository } from "../../../usecaseLayer/interface/repository/ICategoryRepository";
import CategoryModel from "../model/categoryModel";
import { addCategory } from "./category/addCategory";
import { getCategories } from "./category/getCategories";
import { getCategoryById } from "./category/getCategoryById";
import { editCategory } from "./category/editCategory";

export class CategoryRepository implements ICategoryRepository {

    constructor(private readonly categoryModel: typeof CategoryModel) { }

    async addCategory(newCategory: ICategory): Promise<ICategory> {
        return addCategory(newCategory, this.categoryModel)
    }

    async editCategory(updatedCategory: ICategory): Promise<ICategory> {
        return editCategory(updatedCategory, this.categoryModel)
    }

    async getCategories(page: number, limit: number): Promise<{ data: ICategory[], total: number }> {
        return getCategories(page, limit, this.categoryModel);
    }

    async getCategoryById(_id: string): Promise<ICategory | null> {
        return getCategoryById(_id, this.categoryModel); // Use the new function
    }

}