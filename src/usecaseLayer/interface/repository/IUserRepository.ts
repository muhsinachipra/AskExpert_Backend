// backend\src\usecaseLayer\interface\repository\IUserRepository.ts

import { IUser } from "../../../domainLayer/user"
import { IResetPassword } from '../services/IResponse'

export interface IUserRepository {
    createUser(newUser: IUser): Promise<IUser>
    findUser(email: string): Promise<IUser | null>
    resetPassword(newPassword: IResetPassword): Promise<IUser>
    // blockUser(_id: string): Promise<string | null>
}