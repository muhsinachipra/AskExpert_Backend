// backend\src\usecaseLayer\usecase\user\validateAccessToken.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const validateAccessToken = async (userRepository: IUserRepository, token: string, jwt: IJwt,
): Promise<IResponse> => {
    try {
        console.log('--> usecaseLayerusecase/user/validateAccessToken.ts')

        console.log('token::::', token)

        const decoded = await jwt.verifyJWT(token);
        // const decoded: any = await new Promise((resolve, reject) => {
        //     jwt.verify(token, process.env.JWT_KEY as string, (err: any, res: any) => {
        //         if (err) {
        //             return reject(ErrorResponse.badRequest("token not verified"));
        //         }
        //         resolve(res);
        //     });
        // });

        console.log('1111111111',decoded)
        console.log(decoded.email)
        const user = await userRepository.findUser(decoded.email);
        console.log(user, "userrrr")

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