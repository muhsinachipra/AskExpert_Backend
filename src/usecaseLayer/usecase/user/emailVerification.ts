// backend\src\usecaseLayer\usecase\user\emailVerification.ts

import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import INodemailer from "../../interface/services/INodemailer";
import { IResponse } from "../../interface/services/IResponse";


export const emailVerification = async (
    requestValidator: IRequestValidator,
    nodemailer: INodemailer,
    otp: string,
    email: string
): Promise<IResponse> => {
    try {

        // console.log("user emailVerification", email, otp);

        const validation = requestValidator.validateRequiredFields({ email, otp }, ["email", "otp"]);

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const verify = await nodemailer.verifyOTP(otp, email);
        if (verify) {
            return {
                status: 200,
                success: true,
                message: "Succesfully logged In",
            };
        }
        throw ErrorResponse.badRequest("Wrong OTP");
    } catch (err) {
        throw err;
    }
};
