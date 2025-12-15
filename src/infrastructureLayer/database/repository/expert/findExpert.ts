// backend\src\infrastructureLayer\database\repository\expert\findExpert.ts

import ExpertModel from "../../model/expertModel";

export const findExpert = async (
    email: string,
    expertModel: typeof ExpertModel
) => {
    try {
        // console.log('email in findExpertByEmail in expertRepository --->>>> ', email)
        const existingExpert = await expertModel.findOne({ email });
   
        return existingExpert;
    } catch (error) {
        throw error
    }
};