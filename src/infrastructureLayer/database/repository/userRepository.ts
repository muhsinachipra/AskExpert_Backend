// backend\src\infrastructureLayer\database\repository\userRepository.ts

import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { resetPassword } from "./user/resetPassword";

export class UserRepository implements IUserRepository {

    constructor(private readonly userModel: typeof UserModel) { }

    async createUser(newUser: IUser): Promise<IUser> {
        return createUser(newUser, this.userModel)
    }

    async findUser(email: string): Promise<IUser | null> {
        return findUser(email, this.userModel)
    }

    async resetPassword(newPassword: IResetPassword): Promise<IUser> {
        return resetPassword(newPassword, this.userModel);
    }
}