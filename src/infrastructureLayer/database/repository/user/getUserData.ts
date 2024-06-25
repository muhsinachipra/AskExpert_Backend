// backend\src\infrastructureLayer\database\repository\user\getUserData.ts

import UserModel from "../../model/userModel";

export const getUserData = async (page: number, limit: number, userModel: typeof UserModel) => {
    try {
        const skip = (page - 1) * limit;
        const userData = await userModel.find().skip(skip).limit(limit).sort({ createdAt: 1 }).select("-password");
        const total = await userModel.countDocuments();
        return { data: userData, total };
    } catch (error) {
        throw error;
    }
};