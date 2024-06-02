// backend\src\usecaseLayer\interface\repository\IExpertRepository.ts

import { IExpert } from "../../../domainLayer/expert"
import { IResetPassword } from '../services/IResponse'

export interface IExpertRepository {
    findExpert(email: string): Promise<IExpert | null>
    createExpert(newExpert: IExpert): Promise<IExpert>
    updateProfile(data: { _id: string; name: string; rate: number }): Promise<IExpert>;
    // resetPassword(newPassword: IResetPassword): Promise<IExpert>
    // blockExpert(_id: string): Promise<string | null>
}