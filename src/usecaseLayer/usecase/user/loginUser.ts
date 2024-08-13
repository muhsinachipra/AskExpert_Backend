// backend\src\usecaseLayer\usecase\user\loginUser.ts

import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IBcrypt from "../../interface/services/IBcrypt";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const loginUser = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IBcrypt,
    jwt: IJwt,
    email: string,
    password: string
): Promise<IResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { email, password },
            ["email", "password"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const user: IUser | null = await userRepository.findUser(email);


        if (user && user._id) {
            if (user.isBlocked) {
                throw ErrorResponse.unauthorized("Your account is blocked");
            }
            const match: boolean = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.createJWT(user._id, user.email, "user", user.name);

                user.password = ""

                return {
                    status: 200,
                    success: true,
                    token: token,
                    data: user,
                    message: `Welcome ${user.name}`,
                };
            }
            throw ErrorResponse.badRequest("Invalid credentials");
        }
        throw ErrorResponse.notFound("Invalid credentials");
    } catch (err) {
        console.error("Login error:", err);
        throw err;
    }
};
