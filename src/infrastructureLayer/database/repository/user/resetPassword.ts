// backend\src\infrastructureLayer\database\repository\user\resetPassword.ts

import { IUser } from "../../../../domainLayer/user";
import { IResetPassword } from "../../../../usecaseLayer/interface/services/IResponse";
import UserModel from "../../model/userModel";

export const resetPassword = async (
    newPassword: IResetPassword,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
        const user = await userModels.findById(newPassword.id);
        if (!user) {
            throw new Error("User not found");
        }
        user.password = newPassword.password;
        await user.save();
        user.password = ""
        return user;
    } catch (error) {
        throw error;
    }
}
