// backend\src\usecaseLayer\interface\repository\IUserRepository.ts

import { IUser } from "../../../domainLayer/user"
import { IResetPassword } from '../services/IResponse'

export interface IUserRepository {
    createUser(newUser: IUser): Promise<IUser>
    findUser(email: string): Promise<IUser | null>
    resetPassword(newPassword: IResetPassword): Promise<IUser>
    updateProfile(data:Record<string,string>): Promise<IUser>;
    findUserById(userId: string): Promise<IUser | null>
    getUserData(page: number, limit: number): Promise<{ data: IUser[], total: number }>
    updateUserBlockedStatus(userId: string): Promise<IUser | null>
}