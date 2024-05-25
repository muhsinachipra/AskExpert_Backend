import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IResponse } from "../../interface/services/IResponse";
const jwt = require("jsonwebtoken");
import IJwt from "../../interface/services/IJwt";

export const validateAccessToken = async (
    userRepository: IUserRepository,
    token: string,
): Promise<IResponse> => {
    try {
        console.log('--> usecaseLayerusecase/user/validateAccessToken.ts')

        console.log('token::::', token)

        const decoded = await jwt.verify(token, process.env.JWT_KEY, (err: any, res: any) => {
            if (err) {
                throw ErrorResponse.badRequest("token not verified");
            }
            return res
        });

        console.log(decoded)

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