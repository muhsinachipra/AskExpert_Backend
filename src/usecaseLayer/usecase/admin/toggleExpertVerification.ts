// backend\src\usecaseLayer\usecase\admin\toggleExpertVerification.ts

import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IResponse } from "../../interface/services/IResponse";


export const toggleExpertVerification = async (expertId: string, expertRepository: IExpertRepository): Promise<IResponse> => {
    try {
        const data = await expertRepository.toggleExpertVerification(expertId);
        if (data) {
            return {
                success: true,
                data,
                message: 'Expert verification status updated successfully',
                status: 200,
            };
        }
        return {
            success: false,
            data: null,
            message: 'Expert not found',
            status: 404,
        };
    } catch (error) {
        throw error;
    }
}