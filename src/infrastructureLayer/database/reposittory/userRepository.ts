import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";

export class UserRepository implements IUserRepository {

    constructor(private readonly userModel: typeof UserModel) { }

    async createUser(newUser: IUser): Promise<IUser> {
        return createUser(newUser, this.userModel)
    }

    async findUser(email: string): Promise<IUser | null> {
        return findUser(email, this.userModel)
    }
}