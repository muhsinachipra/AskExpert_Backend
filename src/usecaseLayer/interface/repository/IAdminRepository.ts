// backend\src\usecaseLayer\interface\repository\IAdminRepository.ts

import { IAdmin } from "../../../domainLayer/admin"
import { IExpert } from "../../../domainLayer/expert";

export interface IAdminRepository {
    findAdmin(email: string): Promise<IAdmin | null>
    getExpertData(): Promise<IExpert[]>;
    toggleExpertVerification(expertId: string): Promise<IExpert | null>;
}