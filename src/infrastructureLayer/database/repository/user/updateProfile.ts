// backend\src\infrastructureLayer\database\repository\user\updateUser.ts

import { IUser } from "../../../../domainLayer/user";
import UserModel from "../../model/userModel";

export const updateProfile = async (
    data : Record<string,string>,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
        const user = await userModels.findOne({ _id: data._id}).select("-password");
        if (user) {
            user.name = data.name
            user.mobile = data.mobile
            user.profilePic = data.profilePic
            await user.save();
            return user;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
