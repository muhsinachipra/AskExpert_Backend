// backend\src\infrastructureLayer\database\repository\admin\toggleExpertVerification.ts

import ExpertModel from "../../model/expertModel";
import { IExpert } from "../../../../domainLayer/expert";

export const toggleExpertVerification = async (expertId: string): Promise<IExpert | null> => {
    try {
        const expert = await ExpertModel.findById(expertId).select("-password");
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
