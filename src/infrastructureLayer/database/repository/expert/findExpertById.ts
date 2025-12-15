// backend\src\infrastructureLayer\database\repository\expert\findExpertById.ts

import ExpertModel from "../../model/expertModel";

export const findExpertById = async (
    expertId: string,
    expertModel: typeof ExpertModel
) => {
    try {
        const expert = await expertModel.findById(expertId);
        return expert;
    } catch (error) {
        throw error;
    }
};
