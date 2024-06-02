// backend\src\infrastructureLayer\database\repository\adminRepository.ts

import { IAdmin } from "../../../domainLayer/admin";
import { IExpert } from "../../../domainLayer/expert";
import { IAdminRepository } from "../../../usecaseLayer/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";
import { findAdmin } from "./admin/findAdmin";
import { getExpertData } from "./admin/getExpertData";
import { toggleExpertVerification } from './admin/toggleExpertVerification'

export class AdminRepository implements IAdminRepository {

    constructor(private readonly adminModel: typeof AdminModel) { }

    async findAdmin(email: string): Promise<IAdmin | null> {
        return findAdmin(email, this.adminModel)
    }

    async getExpertData(): Promise<IExpert[]> {
        return getExpertData();
    }

    async toggleExpertVerification(expertId: string): Promise<IExpert | null> {
        return toggleExpertVerification(expertId);
    }
}