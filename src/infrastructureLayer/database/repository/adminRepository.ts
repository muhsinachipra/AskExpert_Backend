// backend\src\infrastructureLayer\database\repository\adminRepository.ts

import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../usecaseLayer/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";
import { findAdmin } from "./admin/findAdmin";

export class AdminRepository implements IAdminRepository {

    constructor(
        private readonly adminModel: typeof AdminModel,
    ) { }

    async findAdmin(email: string): Promise<IAdmin | null> {
        return findAdmin(email, this.adminModel)
    }

    // async addCategory(newCategory: ICategory): Promise<ICategory> {
    //     return addCategory(newCategory, this.categoryModel)
    // }
}