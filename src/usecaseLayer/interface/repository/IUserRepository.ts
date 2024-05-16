import { IUser } from "../../../domainLayer/user"
import { IForgetPassword } from '../services/IResponse'

export interface IUserRepository {
    createUser(newUser: IUser): Promise<IUser>
    findUser(email: string): Promise<IUser | null>
    // blockUser(_id: string): Promise<string | null>
    // forgetPassword(newPassword: IForgetPassword): Promise<IUser>
}