// backend\src\usecaseLayer\usecase\admin\getExpertData.ts

import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getExpertData = async (page: number, limit: number, expertRepository: IExpertRepository): Promise<IResponse> => {
    try {
        const { data, total } = await expertRepository.getExpertData(page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Expert data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve expert data',
            status: 500,
        };
    }
}
