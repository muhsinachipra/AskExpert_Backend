// backend\src\usecaseLayer\usecase\adminUsecase.ts

import { ICategory } from '../../domainLayer/category'
import { IAdminRepository } from '../interface/repository/IAdminRepository'
import { IAppointmentRepository } from '../interface/repository/IAppointmentRepository'
import { ICategoryRepository } from '../interface/repository/ICategoryRepository'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IReviewRepository } from '../interface/repository/IReviewRepository'
import { IUserRepository } from '../interface/repository/IUserRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { addCategory } from './admin/addCategory'
import { editCategory } from './admin/editCategory'
import { getCategories } from './admin/getCategories'
import { getExpertData } from './admin/getExpertData'
import { getExpertDataSortByReport } from './admin/getExpertDataSortByReport'
import { getUserData } from './admin/getUserData'
import { loginAdmin } from './admin/loginAdmin'
import { sendVerifiedEmail } from './admin/sendVerifiedEmail'
import { toggleExpertVerification } from './admin/toggleExpertVerification'
import { updateExpertBlockedStatus } from './admin/updateExpertBlockedStatus'
import { updateUserBlockedStatus } from './admin/updateUserBlockedStatus'

export class AdminUsecase {
    private readonly adminRepository: IAdminRepository
    private readonly expertRepository: IExpertRepository
    private readonly userRepository: IUserRepository
    private readonly categoryRepository: ICategoryRepository
    private readonly appointmentRepository: IAppointmentRepository
    private readonly reviewRepository: IReviewRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        adminRepository: IAdminRepository,
        expertRepository: IExpertRepository,
        userRepository: IUserRepository,
        categoryRepository: ICategoryRepository,
        appointmentRepository: IAppointmentRepository,
        reviewRepository: IReviewRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.adminRepository = adminRepository
        this.expertRepository = expertRepository
        this.userRepository = userRepository
        this.categoryRepository = categoryRepository
        this.appointmentRepository = appointmentRepository
        this.reviewRepository = reviewRepository
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

    async getExpertDataSortByReport(page: number, limit: number) {
        return getExpertDataSortByReport(
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

    async addCategory({ categoryImage, categoryName, categoryDescription }: {
        categoryImage: string, categoryName: string, categoryDescription: string
    }) {
        return addCategory(
            categoryImage,
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

    async getUserData(page: number, limit: number) {
        return getUserData(
            page, limit, this.userRepository
        );
    }

    async updateUserBlockedStatus(userId: string) {
        return updateUserBlockedStatus(
            userId,
            this.requestValidator,
            this.userRepository
        )
    }

    async updateExpertBlockedStatus(expertId: string) {
        return updateExpertBlockedStatus(
            expertId,
            this.requestValidator,
            this.expertRepository
        )
    }

    async getDashboardData() {
        try {
            const userData = await this.userRepository.getUserStatistics();
            const expertData = await this.expertRepository.getExpertStatistics();
            const appointmentData = await this.appointmentRepository.getAppointmentStatistics();
            const reportData = await this.reviewRepository.getReportStatistics();
            return {
                userData,
                expertData,
                appointmentData,
                reportData,
                status: 200,
            };
        } catch (error) {
            throw error
        }
    }

    async expertsByCategory() {
        try {
            const data = await this.expertRepository.expertsByCategory();
            return {
                data,
                status: 200,
            };
        } catch (error) {
            throw error
        }
    }

    async userCount() {
        try {
            const data = await this.userRepository.userCount();
            return {
                data,
                status: 200,
            };
        } catch (error) {
            throw error;
        }
    }
}