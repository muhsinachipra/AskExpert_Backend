// backend\src\usecaseLayer\usecase\admin\sendVerifiedEmail.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import INodemailer from "../../interface/services/INodemailer";
import { IResponse } from "../../interface/services/IResponse";


export const sendVerifiedEmail = async (
    requestValidator: IRequestValidator,
    expertRepository: IExpertRepository,
    nodemailer: INodemailer,
    expertId: string,
): Promise<IResponse> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { expertId },
            ["expertId"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const expert = await expertRepository.findExpertById(expertId);
        if (!expert) {
            throw ErrorResponse.badRequest("expert does not exist");
        }

        const verify = await nodemailer.sendVerifiedEmail(expert.email, expert.name);

        return {
            status: 200,
            success: true,
            message: verify,
        };
    } catch (err) {
        throw err;
    }
};
