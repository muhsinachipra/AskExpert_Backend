// backend\src\usecaseLayer\usecase\user\forgotPassword.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import INodemailer from "../../interface/services/INodemailer"; 
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";


export const forgotPassword = async (
    requestValidator: IRequestValidator, userRepository: IUserRepository, jwt: IJwt, nodemailer: INodemailer, email: string, name: string, token: string,
): Promise<IResponse> => {
    try {
        const user = await userRepository.findUser(email);
        if (!user) {
            throw ErrorResponse.notFound("User not found");
        }

        const validation = requestValidator.validateRequiredFields(
            { email },
            ["email"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const token = jwt.createJWT(user._id as string, user.email, "resetPassword", user.name)

        console.log('forgot password token', token);

        const sendForgotPasswordEmail = await nodemailer.sendForgotPasswordEmail(user.email, user.name, token);
        console.log('sendForgotPasswordEmail :', sendForgotPasswordEmail);

        return {
            status: 200,
            success: true,
            message: sendForgotPasswordEmail
        }
    } catch (err) {
        throw err;
    }
};
