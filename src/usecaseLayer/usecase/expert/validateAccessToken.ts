// backend\src\usecaseLayer\usecase\expert\validateAccessToken.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const validateAccessToken = async (expertRepository: IExpertRepository, token: string, jwt: IJwt,
): Promise<IResponse> => {
    try {
        console.log('--> usecaseLayerusecase/expert/validateAccessToken.ts')

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
        const expert = await expertRepository.findExpert(decoded.email);
        console.log(expert, "expertrrr")

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