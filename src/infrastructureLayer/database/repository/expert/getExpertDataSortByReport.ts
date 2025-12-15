// backend\src\infrastructureLayer\database\repository\expert\getExpertDataSortByReport.ts

import ExpertModel from "../../model/expertModel";

export const getExpertDataSortByReport = async (page: number, limit: number, expertModel: typeof ExpertModel) => {
    try {
        const skip = (page - 1) * limit;
        const expertData = await expertModel.find().skip(skip).limit(limit).sort({ reports: -1 }).select("-password");
        const total = await expertModel.countDocuments();
        return { data: expertData, total };
    } catch (error) {
        throw error;
    }
};