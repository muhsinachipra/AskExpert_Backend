// backend\src\infrastructureLayer\database\repository\admin\getExpertData.ts

import ExpertModel from "../../model/expertModel";

export const getExpertData = async () => {
    try {
        const expertData = await ExpertModel.find();
        return expertData;
    } catch (error) {
        throw error;
    }
};
