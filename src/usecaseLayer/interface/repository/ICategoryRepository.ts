// backend\src\usecaseLayer\interface\repository\ICategoryRepository.ts

import { ICategory } from "../../../domainLayer/category"

export interface ICategoryRepository {
    addCategory(newCategory: ICategory): Promise<ICategory>
    getCategories(page: number, limit: number): Promise<{ data: ICategory[], total: number }>
}