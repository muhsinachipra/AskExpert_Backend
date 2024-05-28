// backend\src\usecaseLayer\interface\repository\IAdminRepository.ts

import { IAdmin } from "../../../domainLayer/admin"
export interface IAdminRepository {
    findAdmin(email: string): Promise<IAdmin | null>
}