// backend\src\infrastructureLayer\database\repository\expert\updateExpertBlockedStatus.ts

import ExpertModel from "../../model/expertModel";
import { IExpert } from "../../../../domainLayer/expert";

export const updateExpertBlockedStatus = async (expertId: string, expertModel: typeof ExpertModel): Promise<IExpert | null> => {
    try {
        const expert = await expertModel.findById(expertId).select("-password");
        if (expert) {
            expert.isBlocked = !expert.isBlocked;
            await expert.save();
            return expert;
        }
        return null;
    } catch (error) {
        throw error;
    }
};
