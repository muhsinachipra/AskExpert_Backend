// backend\src\usecaseLayer\usecase\user\sendOTP.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import INodemailer from "../../interface/services/INodemailer";
import { IResponse } from "../../interface/services/IResponse";


export const sendOTP = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    nodemailer: INodemailer,
    email: string,
    name: string
): Promise<IResponse> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { email, name },
            ["email", "name"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const verify = await nodemailer.sendEmailVerification(email, name);

        return {
            status: 200,
            success: true,
            message: verify,
        };
    } catch (err) {
        throw err;
    }
};
