// backend\src\usecaseLayer\interface\repository\ICategoryRepository.ts

import { ICategory } from "../../../domainLayer/category"

export interface ICategoryRepository {
    addCategory(newCategory: ICategory): Promise<ICategory>
    getCategories(page: number, limit: number): Promise<{ data: ICategory[], total: number }>
    editCategory(updatedCategory: ICategory): Promise<ICategory>;
    getCategoryById(_id: string | undefined): Promise<ICategory | null>;
    findCategoryByName(categoryName: string): Promise<ICategory | null>
}