import { IUser } from "../../../../domainLayer/user";
import { IForgotPassword } from "../../../../usecaseLayer/interface/services/IResponse";
import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const forgotPassword = async (
    newPassword: IForgotPassword,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
        const user = await userModels.findOne({ email: newPassword.email });
        if (user) {
            user.password = newPassword.password;
            await user.save();
            user.password = ""
            return user;
        }
        throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}
