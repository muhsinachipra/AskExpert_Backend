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


export class UserUsecase {
    private readonly userRepository: IUserRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        userRepository: IUserRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.userRepository = userRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.nodemailer = nodemailer
        this.requestValidator = requestValidator
    }

    async createUser({ name, mobile, email, password }: {
        name: string, mobile: string, email: string, password: string
    }) {
        try {
            return await createUser(
                this.requestValidator,
                this.userRepository,
                this.bcrypt,
                name,
                mobile,
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
    async googleAuth({ name, email, password, }: { name: string; email: string; password: string; }) {
        return googleAuth(
            this.requestValidator,
            this.userRepository,
            this.bcrypt,
            this.jwt,
            name,
            email,
            password
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

    async updateProfile({ _id, name, mobile }: { _id: string, name: string, mobile: string }) {
        try {
            return await updateProfile(
                this.requestValidator,
                this.userRepository,
                _id,
                name,
                mobile
            );
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

}