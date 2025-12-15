// backend\src\usecaseLayer\usecase\admin\getUserData.ts

import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IResponse } from "../../interface/services/IResponse";

export const getUserData = async (page: number, limit: number, userRepository: IUserRepository): Promise<IResponse> => {
    try {
        const { data, total } = await userRepository.getUserData(page, limit);
        return {
            success: true,
            data,
            total,
            message: 'User data retrieved successfully',
            status: 200,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Failed to retrieve user data',
            status: 500,
        };
    }
}
