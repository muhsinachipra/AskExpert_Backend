// backend\src\usecaseLayer\usecase\adminUsecase.ts

import { IAdminRepository } from '../interface/repository/IAdminRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import { IResponse } from '../interface/services/IResponse'
import { loginAdmin } from './admin/loginAdmin'

export class AdminUsecase {
    private readonly adminRepository: IAdminRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly requestValidator: IRequestValidator

    constructor(
        adminRepository: IAdminRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        requestValidator: IRequestValidator
    ) {
        this.adminRepository = adminRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.requestValidator = requestValidator
    }

    async loginAdmin({ email, password }: { email: string; password: string }) {
        try {
            return await loginAdmin(
                this.requestValidator,
                this.adminRepository,
                this.bcrypt,
                this.jwt,
                email,
                password
            );
        } catch (error) {
            console.error('Error Login admin:', error);
            throw error;
        }
    }

    async getExpertData(): Promise<IResponse> {
        try {
            const expertData = await this.adminRepository.getExpertData();
            return {
                success: true,
                data: expertData,
                message: 'Expert data retrieved successfully',
                status: 200,
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'Failed to retrieve expert data',
                status: 500,
            };
        }
    }

    async toggleExpertVerification(expertId: string): Promise<IResponse> {
        try {
            const updatedExpert = await this.adminRepository.toggleExpertVerification(expertId);
            if (updatedExpert) {
                return {
                    success: true,
                    data: updatedExpert,
                    message: 'Expert verification status updated successfully',
                    status: 200,
                };
            }
            return {
                success: false,
                data: null,
                message: 'Expert not found',
                status: 404,
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'Failed to update expert verification status',
                status: 500,
            };
        }
    }
}