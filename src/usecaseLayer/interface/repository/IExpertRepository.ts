// backend\src\usecaseLayer\interface\repository\IExpertRepository.ts

import { IExpert } from "../../../domainLayer/expert"
import { IResetPassword } from '../services/IResponse'

export interface IExpertRepository {
    findExpert(email: string): Promise<IExpert | null>
    createExpert(newExpert: IExpert): Promise<IExpert>
    updateProfile(data: { _id: string; profilePic: string; name: string; rate: number; experience: number }): Promise<IExpert>;
    resetPassword(newPassword: IResetPassword): Promise<IExpert>
    findExpertById(_id: string): Promise<IExpert | null>

    // resetPassword(newPassword: IResetPassword): Promise<IExpert>
    // blockExpert(_id: string): Promise<string | null>
}