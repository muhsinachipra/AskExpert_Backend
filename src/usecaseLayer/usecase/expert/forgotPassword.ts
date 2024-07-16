// backend\src\usecaseLayer\usecase\expert\forgotPassword.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import INodemailer from "../../interface/services/INodemailer";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";


export const forgotPassword = async (
    requestValidator: IRequestValidator, expertRepository: IExpertRepository, jwt: IJwt, nodemailer: INodemailer, email: string, name: string, token: string,
): Promise<IResponse> => {
    try {
        const expert = await expertRepository.findExpert(email);
        if (!expert) {
            throw ErrorResponse.notFound("Expert not found");
        }

        const validation = requestValidator.validateRequiredFields(
            { email },
            ["email"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const { accessToken } = jwt.createJWT(expert._id as string, expert.email, "resetPassword", expert.name)

        console.log('forgot password token', accessToken);

        const expertRoute = '/expert'

        const sendForgotPasswordEmail = await nodemailer.sendForgotPasswordEmail(expertRoute, expert.email, expert.name, accessToken);
        // console.log('------------------- sendForgotPasswordEmail :', sendForgotPasswordEmail);

        return {
            status: 200,
            success: true,
            message: sendForgotPasswordEmail
        }
    } catch (err) {
        throw err;
    }
};
