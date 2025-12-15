// backend\src\usecaseLayer\usecase\user\validateAccessToken.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const validateAccessToken = async (userRepository: IUserRepository, token: string, jwt: IJwt,
): Promise<IResponse> => {
    try {
        console.log('--> usecaseLayerusecase/user/validateAccessToken.ts')

        const decoded = await jwt.verifyJWT(token);
        const user = await userRepository.findUser(decoded.email);

        if (user) {
            return {
                status: 200,
                success: true,
                message: "Token verified",
                data: user._id
            }
        } else {
            throw ErrorResponse.badRequest("token not verified");
        }
    } catch (error) {
        throw error
    }
};