// backend\src\usecaseLayer\usecase\userUsecase.ts

import { IUserRepository } from '../interface/repository/IUserRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { createUser } from "./user/createUser"
import { emailVerification } from './user/emailVerification'
import { forgotPassword } from './user/forgotPassword'
import { googleAuth } from './user/googleAuth'
import { loginUser } from './user/loginUser'
import { resetPassword } from './user/resetPassword'
import { sendOTP } from './user/sendOTP'
import { validateAccessToken } from './user/validateAccessToken'
import { updateProfile } from './user/updateProfile'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { getExpertsByCategory } from './user/getExpertsByCategory'
import { getCategories } from './user/getCategories'
import { ICategoryRepository } from '../interface/repository/ICategoryRepository'



export class UserUsecase {
    private readonly userRepository: IUserRepository
    private readonly expertRepository: IExpertRepository
    private readonly categoryRepository: ICategoryRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        userRepository: IUserRepository,
        expertRepository: IExpertRepository,
        categoryRepository: ICategoryRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.userRepository = userRepository
        this.expertRepository = expertRepository
        this.categoryRepository = categoryRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.nodemailer = nodemailer
        this.requestValidator = requestValidator
    }

    async createUser({ name, mobile, email, password, profilePic }: {
        name: string, mobile: string, email: string, password: string, profilePic: string
    }) {
        try {
            return await createUser(
                this.requestValidator,
                this.userRepository,
                this.bcrypt,
                name,
                mobile,
                profilePic,
                email,
                password
            );
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async loginUser({ email, password }: { email: string; password: string }) {
        try {
            return await loginUser(
                this.requestValidator,
                this.userRepository,
                this.bcrypt,
                this.jwt,
                email,
                password
            );
        } catch (error) {
            console.error('Error Login user:', error);
            throw error;
        }

    }

    //to send OTP to verify the user's detail
    async sendOTP({ email, name }: { email: string; name: string }) {
        return sendOTP(this.requestValidator, this.userRepository, this.nodemailer, email, name);
    }

    //to check if the user entered OTP is correct or not
    async emailVerification({ otp, email }: { otp: string; email: string }) {
        return emailVerification(this.requestValidator, this.nodemailer, otp, email);
    }

    //to create user
    async googleAuth({ name, email, password, profilePic }: { name: string; email: string; password: string; profilePic: string; }) {
        return googleAuth(
            this.requestValidator,
            this.userRepository,
            this.bcrypt,
            this.jwt,
            name,
            email,
            password,
            profilePic,
        );
    }

    async forgotPassword({ email, name, token }: { email: string, name: string, token: string; }) {
        return forgotPassword(
            this.requestValidator,
            this.userRepository,
            this.jwt,
            this.nodemailer,
            email,
            name,
            token

        );
    }

    async validateAccessToken({ token }: { token: string }) {
        return validateAccessToken(
            this.userRepository,
            token,
            this.jwt,
        )
    }

    async resetPassword({ id, password }: { id: string, password: string }) {
        return resetPassword(
            this.userRepository,
            this.requestValidator,
            this.bcrypt,
            id,
            password
        )
    }

    async updateProfile({ _id, name, mobile, profilePic }: { _id: string, name: string, mobile: string, profilePic: string }) {
        try {
            return await updateProfile(
                this.requestValidator,
                this.userRepository,
                _id,
                name,
                mobile,
                profilePic
            );
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    async getExpertsByCategory(categoryName: string) {
        return getExpertsByCategory(
            categoryName,
            this.requestValidator,
            this.expertRepository,
        );
    }

    async userGetExpertData(expertId: string) {
        try {
            const data = await this.expertRepository.findExpertById(expertId);
            return {
                success: true,
                data,
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

    async getCategories(page: number, limit: number) {
        return getCategories(
            page, limit, this.categoryRepository
        );
    }

}