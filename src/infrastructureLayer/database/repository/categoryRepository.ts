// backend\src\infrastructureLayer\database\repository\categoryRepository.ts

import { ICategory } from "../../../domainLayer/category";
import { ICategoryRepository } from "../../../usecaseLayer/interface/repository/ICategoryRepository";
import CategoryModel from "../model/categoryModel";
import { addCategory } from "./admin/addCategory";
import { getCategories } from "./category/getCategories";

export class CategoryRepository implements ICategoryRepository {

    constructor(private readonly categoryModel: typeof CategoryModel) { }

    async addCategory(newCategory: ICategory): Promise<ICategory> {
        return addCategory(newCategory, this.categoryModel)
    }

    async getCategories(page: number, limit: number): Promise<{ data: ICategory[], total: number }> {
        return getCategories(page, limit, this.categoryModel);
    }

}