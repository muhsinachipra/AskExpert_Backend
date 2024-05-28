// backend\src\usecaseLayer\usecase\adminUsecase.ts

import { IAdminRepository } from '../interface/repository/IAdminRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
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

}