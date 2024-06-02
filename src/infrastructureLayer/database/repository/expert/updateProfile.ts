// backend\src\infrastructureLayer\database\repository\expert\updateExpert.ts

import { IExpert } from "../../../../domainLayer/expert";
import ExpertModel from "../../model/expertModel";

export const updateProfile = async (
    data: { _id: string; name: string; rate: number },
    expertModels: typeof ExpertModel
): Promise<IExpert | never> => {
    try {
        const expert = await expertModels.findOne({ _id: data._id }).select("-password");
        if (expert) {
            expert.name = data.name
            expert.rate = data.rate
            await expert.save();
            return expert;
        }
        throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}
