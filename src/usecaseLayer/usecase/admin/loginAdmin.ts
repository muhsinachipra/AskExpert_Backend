// backend\src\usecaseLayer\usecase\admin\loginAdmin.ts

import { IAdmin } from "../../../domainLayer/admin";
import ErrorResponse from "../../handler/errorResponse";
import { IAdminRepository } from "../../interface/repository/IAdminRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IBcrypt from "../../interface/services/IBcrypt";
import IJwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/IResponse";

export const loginAdmin = async (
    requestValidator: IRequestValidator,
    adminRepository: IAdminRepository,
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

        const admin: IAdmin | null = await adminRepository.findAdmin(email);


        if (admin && admin._id) {
            const match: boolean = await bcrypt.compare(password, admin.password);
            if (match) {
                const token = jwt.createJWT(admin._id, admin.email, "admin", admin.name);
                admin.password = ""

                return {
                    status: 200,
                    success: true,
                    token: token,
                    data: admin,
                    message: `Welcome ${admin.name}`,
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
