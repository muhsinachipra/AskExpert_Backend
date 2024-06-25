// backend\src\usecaseLayer\usecase\user\getUserData.ts

import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IResponse } from "../../interface/services/IResponse";
import jwt from 'jsonwebtoken';

export const getUserData = async (
    userRepository: IUserRepository,
    token: string
): Promise<IResponse> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const user: IUser | null = await userRepository.findUser(decoded.email);

        if (user && user._id) {
            if (user.isBlocked) {
                throw ErrorResponse.unauthorized("Your account is blocked");
            }
            user.password = ""
            const { name, email, mobile, isBlocked } = user
            const data = { name, email, mobile, isBlocked }
            return {
                status: 200,
                success: true,
                // token: token,
                data,
                message: `Welcome ${user.name}`,
            };
        }
        throw ErrorResponse.notFound("Invalid Token");
    } catch (err) {
        console.error("Login error:", err);
        throw err;
    }
};
