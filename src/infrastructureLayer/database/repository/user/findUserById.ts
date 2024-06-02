// backend\src\infrastructureLayer\database\repository\user\findUserById.ts

import UserModel from "../../model/userModel";

export const findUserById = async (
    userId: string,
    userModel: typeof UserModel
) => {
    try {
        const user = await userModel.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};
