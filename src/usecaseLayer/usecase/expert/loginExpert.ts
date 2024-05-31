// backend\src\usecaseLayer\usecase\expert\loginExpert.ts

import { IExpert } from "../../../domainLayer/expert";
import ErrorResponse from "../../handler/errorResponse";
import { IExpertRepository } from "../../interface/repository/IExpertRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IBcrypt from "../../interface/services/IBcrypt";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const loginExpert = async (
    requestValidator: IRequestValidator,
    expertRepository: IExpertRepository,
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

        const expert: IExpert | null = await expertRepository.findExpert(email);

        if (expert && expert._id) {
            if (expert.isBlocked) {
                throw ErrorResponse.badRequest("Your account is blocked, Please contact Admin");
            }
            const match: boolean = await bcrypt.compare(password, expert.password);
            if (match) {
                const token = jwt.createJWT(expert._id, expert.email, "expert", expert.name);
                expert.password = ""

                return {
                    status: 200,
                    success: true,
                    token: token,
                    data: expert,
                    message: `Welcome ${expert.name}`,
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
