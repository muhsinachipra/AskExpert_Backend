// backend\src\usecaseLayer\usecase\user\resetPassword.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IBcrypt from "../../interface/services/IBcrypt";
import { IResponse } from "../../interface/services/IResponse";


export const resetPassword = async (
    userRepository: IUserRepository,
    requestValidator: IRequestValidator,
    bcrypt: IBcrypt,
    id: string,
    password: string
): Promise<IResponse> => {
    try {
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
        const newPassword = await userRepository.resetPassword(nPassword)

        return {
            status: 200,
            success: true,
            message: "Successfully created",
        };

    } catch (error) {
        throw error;
    }
};