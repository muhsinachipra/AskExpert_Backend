import { IUserRepository } from '../interface/repository/IUserRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IHashPassword from '../interface/services/IHashPassword'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { createUser } from "./user/createUser"
import { emailVerification } from './user/emailVerification'
import { loginUser } from './user/loginUser'
import { verifyEmail } from './user/sentEmail'


export class UserUsecase {
    private readonly userRepository: IUserRepository
    private readonly bcrypt: IHashPassword
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        userRepository: IUserRepository,
        bcrypt: IHashPassword,
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
    async verifyEmail({ email, name }: { email: string; name: string }) {
        return verifyEmail(this.requestValidator, this.userRepository, this.nodemailer, email, name);
    }

    //to check if the user entered OTP is correct or not
    async emailVerification({ otp, email }: { otp: string; email: string }) {
        return emailVerification(this.requestValidator, this.nodemailer, otp, email);
    }
}