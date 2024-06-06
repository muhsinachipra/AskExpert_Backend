// backend\src\usecaseLayer\usecase\adminUsecase.ts

import { IAdminRepository } from '../interface/repository/IAdminRepository'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { IResponse } from '../interface/services/IResponse'
import { loginAdmin } from './admin/loginAdmin'
import { sendVerifiedEmail } from './admin/sendVerifiedEmail'

export class AdminUsecase {
    private readonly adminRepository: IAdminRepository
    private readonly expertRepository: IExpertRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        adminRepository: IAdminRepository,
        expertRepository: IExpertRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.adminRepository = adminRepository
        this.expertRepository = expertRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.nodemailer = nodemailer
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
            const data = await this.adminRepository.toggleExpertVerification(expertId);
            if (data) {
                return {
                    success: true,
                    data,
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

    async sendVerifiedEmail(expertId: string) {
        return sendVerifiedEmail(this.requestValidator, this.expertRepository, this.nodemailer, expertId);
    }

}