// backend\src\infrastructureLayer\database\repository\expert\resetPassword.ts

import { IExpert } from "../../../../domainLayer/expert";
import { IResetPassword } from "../../../../usecaseLayer/interface/services/IResponse";
import ExpertModel from "../../model/expertModel";

// Correct the parameter type for _id
export const resetPassword = async (
    newPassword: IResetPassword,
    expertModels: typeof ExpertModel
): Promise<IExpert | never> => {
    try {
        const expert = await expertModels.findOne({ _id: newPassword.id });
        if (expert) {
            expert.password = newPassword.password;
            await expert.save();
            expert.password = ""
            return expert;
        }
        throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}
