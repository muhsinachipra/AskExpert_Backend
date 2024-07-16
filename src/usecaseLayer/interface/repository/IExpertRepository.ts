// backend\src\usecaseLayer\interface\repository\IExpertRepository.ts

import { IExpert } from "../../../domainLayer/expert"
import { IResetPassword } from '../services/IResponse'

export interface IExpertRepository {
    findExpert(email: string): Promise<IExpert | null>
    createExpert(newExpert: IExpert): Promise<IExpert>
    updateProfile(data: { _id: string; profilePic: string; name: string; mobile: string; experience: number }): Promise<IExpert>;
    resetPassword(newPassword: IResetPassword): Promise<IExpert>
    findExpertById(_id: string): Promise<IExpert | null>
    getExpertData(page: number, limit: number): Promise<{ data: IExpert[], total: number }>
    toggleExpertVerification(expertId: string): Promise<IExpert | null>;
    getExpertsByCategory(categoryName: string): Promise<{ data: IExpert[], total: number }>
    amountToWallet(expertId: string, amount: number): Promise<string | null>
    updateExpertBlockedStatus(expertId: string): Promise<IExpert | null>
    // resetPassword(newPassword: IResetPassword): Promise<IExpert>
    // blockExpert(_id: string): Promise<string | null>
}