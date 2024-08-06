// backend\src\usecaseLayer\usecase\admin\getExpertDataSortByReport.ts

import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getExpertDataSortByReport = async (page: number, limit: number, expertRepository: IExpertRepository): Promise<IResponse> => {
    try {
        const { data, total } = await expertRepository.getExpertDataSortByReport(page, limit);
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
