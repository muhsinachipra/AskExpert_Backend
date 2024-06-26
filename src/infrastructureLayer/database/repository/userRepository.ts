// backend\src\infrastructureLayer\database\repository\userRepository.ts

import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { findUserById } from "./user/findUserById";
import { getUserData } from "./user/getUserData";
import { resetPassword } from "./user/resetPassword";
import { updateProfile } from "./user/updateProfile";
import { updateUserBlockedStatus } from "./user/updateUserBlockedStatus";

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

    async findUserById(userId: string): Promise<IUser | null> {
        return findUserById(userId, this.userModel);
    }

    async updateProfile(data: Record<string, string>): Promise<IUser | never> {
        return updateProfile(data, this.userModel)
    }

    async getUserData(page: number, limit: number): Promise<{ data: IUser[], total: number }> {
        return getUserData(page, limit, this.userModel);
    }

    async updateUserBlockedStatus(userId: string): Promise<IUser | null> {
        return updateUserBlockedStatus(userId, this.userModel);
    }
}