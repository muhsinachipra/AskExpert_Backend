// backend\src\infrastructureLayer\database\repository\expert\toggleExpertVerification.ts

import ExpertModel from "../../model/expertModel";
import { IExpert } from "../../../../domainLayer/expert";

export const toggleExpertVerification = async (expertId: string, expertModel: typeof ExpertModel): Promise<IExpert | null> => {
    try {
        const expert = await expertModel.findById(expertId).select("-password");
        if (expert) {
            expert.isVerified = !expert.isVerified;
            await expert.save();
            return expert;
        }
        return null;
    } catch (error) {
        throw error;
    }
};
