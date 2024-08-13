// backend\src\usecaseLayer\usecase\expert\validateAccessToken.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const validateAccessToken = async (expertRepository: IExpertRepository, token: string, jwt: IJwt,
): Promise<IResponse> => {
    try {
        const decoded = await jwt.verifyJWT(token);
        const expert = await expertRepository.findExpert(decoded.email);

        if (expert) {
            return {
                status: 200,
                success: true,
                message: "Token verified",
                data: expert._id
            }
        } else {
            throw ErrorResponse.badRequest("token not verified");
        }
    } catch (error) {
        throw error
    }
};