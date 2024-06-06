// backend\src\usecaseLayer\usecase\expert\resetPassword.ts

import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IBcrypt from "../../interface/services/IBcrypt";
import { IResponse } from "../../interface/services/IResponse";


export const resetPassword = async (
    expertRepository: IExpertRepository,
    requestValidator: IRequestValidator,
    bcrypt: IBcrypt,
    id: string,
    password: string
): Promise<IResponse> => {
    try {
        console.log("--> usecaseLayer-usecase-expert-resetPassword.ts")
        console.log("creating reseting passsword  ...")
        const validation = requestValidator.validateRequiredFields(
            { password },
            ["password"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const hashedPassword = await bcrypt.createHash(password);

        const nPassword = {
            id: id,
            password: hashedPassword
        }
        const newPassword = await expertRepository.resetPassword(nPassword)

        return {
            status: 200,
            success: true,
            message: "Successfully created",
        };

    } catch (error) {
        throw error;
    }
};