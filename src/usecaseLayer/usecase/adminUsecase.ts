// backend\src\usecaseLayer\usecase\adminUsecase.ts

import { ICategory } from '../../domainLayer/category'
import { IAdminRepository } from '../interface/repository/IAdminRepository'
import { ICategoryRepository } from '../interface/repository/ICategoryRepository'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { addCategory } from './admin/addCategory'
import { editCategory } from './admin/editCategory'
import { getCategories } from './admin/getCategories'
import { getExpertData } from './admin/getExpertData'
import { loginAdmin } from './admin/loginAdmin'
import { sendVerifiedEmail } from './admin/sendVerifiedEmail'
import { toggleExpertVerification } from './admin/toggleExpertVerification'

export class AdminUsecase {
    private readonly adminRepository: IAdminRepository
    private readonly expertRepository: IExpertRepository
    private readonly categoryRepository: ICategoryRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        adminRepository: IAdminRepository,
        expertRepository: IExpertRepository,
        categoryRepository: ICategoryRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.adminRepository = adminRepository
        this.expertRepository = expertRepository
        this.categoryRepository = categoryRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.nodemailer = nodemailer
        this.requestValidator = requestValidator
    }

    async loginAdmin({ email, password }: { email: string; password: string }) {
        return loginAdmin(
            this.requestValidator,
            this.adminRepository,
            this.bcrypt,
            this.jwt,
            email,
            password
        );
    }

    async getExpertData(page: number, limit: number) {
        return getExpertData(
            page, limit, this.expertRepository
        );
    }

    async toggleExpertVerification(expertId: string) {
        return toggleExpertVerification(
            expertId, this.expertRepository
        )
    }

    async sendVerifiedEmail(expertId: string) {
        return sendVerifiedEmail(this.requestValidator, this.expertRepository, this.nodemailer, expertId);
    }

    async addCategory({ categoryName, categoryDescription }: {
        categoryName: string, categoryDescription: string
    }) {
        return addCategory(
            categoryName,
            categoryDescription,
            this.requestValidator,
            this.categoryRepository,
        );
    }

    async editCategory(updatedCategory: ICategory) {
        return editCategory(
            updatedCategory,
            this.requestValidator,
            this.categoryRepository,
        );
    }

    async getCategories(page: number, limit: number) {
        return getCategories(
            page, limit, this.categoryRepository
        );
    }
}