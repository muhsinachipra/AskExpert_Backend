// backend\src\infrastructureLayer\database\repository\user\updateUserBlockedStatus.ts

import UserModel from "../../model/userModel";
import { IUser } from "../../../../domainLayer/user";

export const updateUserBlockedStatus = async (userId: string, userModel: typeof UserModel): Promise<IUser | null> => {
    try {
        const user = await userModel.findById(userId).select("-password");
        if (user) {
            user.isBlocked = !user.isBlocked;
            await user.save();
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
};
