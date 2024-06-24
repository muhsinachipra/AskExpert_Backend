// backend\src\infrastructureLayer\database\repository\expert\getExpertData.ts

import ExpertModel from "../../model/expertModel";

export const getExpertData = async (page: number, limit: number, expertModel: typeof ExpertModel) => {
    try {
        const skip = (page - 1) * limit;
        const expertData = await expertModel.find().skip(skip).limit(limit).sort({ isVerified: 1 }).select("-password");
        const total = await expertModel.countDocuments();
        return { data: expertData, total };
    } catch (error) {
        throw error;
    }
};