// backend\src\infrastructureLayer\database\repository\expert\getExpertsByCategory.ts

import ExpertModel from "../../model/expertModel";

export const getExpertsByCategory = async (categoryName: string, expertModel: typeof ExpertModel) => {
    try {
        console.log('categoryName in repository : ',categoryName)
        const expertData = await expertModel.find({ category: categoryName }).select("-password");
        const total = expertData.length;
        // console.log('expertdata in repository : ', expertData, 'total in repository : ', total)
        return { data: expertData, total };
    } catch (error) {
        throw error;
    }
};