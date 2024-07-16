// backend\src\usecaseLayer\usecase\expertUsecase.ts

// import { Types } from 'mongoose'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IBcrypt from '../interface/services/IBcrypt'
import IJwt from '../interface/services/IJwt'
import INodemailer from '../interface/services/INodemailer'
import { createExpert } from "./expert/createExpert"
import { forgotPassword } from './expert/forgotPassword'
import { loginExpert } from './expert/loginExpert'
import { resetPassword } from './expert/resetPassword'
import { updateProfile } from './expert/updateProfile'
import { validateAccessToken } from './expert/validateAccessToken'
// import { forgotPassword } from './expert/forgotPassword'
// import { googleAuth } from './expert/googleAuth'
// import { resetPassword } from './expert/resetPassword'
// import { validateAccessToken } from './expert/validateAccessToken'


export class ExpertUsecase {
    private readonly expertRepository: IExpertRepository
    private readonly bcrypt: IBcrypt
    private readonly jwt: IJwt
    private readonly nodemailer: INodemailer
    private readonly requestValidator: IRequestValidator

    constructor(
        expertRepository: IExpertRepository,
        bcrypt: IBcrypt,
        jwt: IJwt,
        nodemailer: INodemailer,
        requestValidator: IRequestValidator
    ) {
        this.expertRepository = expertRepository
        this.bcrypt = bcrypt
        this.jwt = jwt
        this.nodemailer = nodemailer
        this.requestValidator = requestValidator
    }

    async createExpert({ name, email, password, category, experience, rate, profilePic, resume }: {
        name: string, email: string, password: string, category: string, experience: number, rate: number, profilePic: string, resume: string
    }) {
        // console.log(' data in expertUsecase createExpert: ', name, email, password, category, experience, rate, profilePic, resume )
        try {
            return await createExpert(
                this.requestValidator,
                this.expertRepository,
                this.bcrypt,
                name,
                email,
                password,
                category,
                experience,
                rate,
                profilePic,
                resume,
            );
        } catch (error) {
            console.error('Error creating expert:', error);
            throw error;
        }
    }

    async loginExpert({ email, password }: { email: string; password: string }) {
        try {
            return await loginExpert(
                this.requestValidator,
                this.expertRepository,
                this.bcrypt,
                this.jwt,
                email,
                password
            );
        } catch (error) {
            console.error('Error Login expert:', error);
            throw error;
        }
    }

    async updateProfile({ _id, profilePic, name, rate, experience }: { _id: string, profilePic: string, name: string, rate: number, experience: number }) {
        try {
            return await updateProfile(
                this.requestValidator,
                this.expertRepository,
                _id,
                profilePic,
                name,
                rate,
                experience
            );
        } catch (error) {
            console.error('Error updating expert profile:', error);
            throw error;
        }
    }

    // //to create expert
    // async googleAuth({ name, email, password, }: { name: string; email: string; password: string; }) {
    //     return googleAuth(
    //         this.requestValidator,
    //         this.expertRepository,
    //         this.bcrypt,
    //         this.jwt,
    //         name,
    //         email,
    //         password
    //     );
    // }

    // async forgotPassword({ email, name, accessToken }: { email: string, name: string, accessToken: string; }) {
    //     return forgotPassword(
    //         this.requestValidator,
    //         this.expertRepository,
    //         this.jwt,
    //         this.nodemailer,
    //         email,
    //         name,
    //         accessToken

    //     );
    // }

    // async validateAccessToken({ accessToken }: { accessToken: string }) {
    //     return validateAccessToken(
    //         this.expertRepository,
    //         accessToken,
    //         this.jwt,
    //     )
    // }

    // async resetPassword({ id, password }: { id: string, password: string }) {
    //     return resetPassword(
    //         this.expertRepository,
    //         this.requestValidator,
    //         this.bcrypt,
    //         id,
    //         password
    //     )
    // }


    async forgotPassword({ email, name, token }: { email: string, name: string, token: string; }) {
        return forgotPassword(
            this.requestValidator,
            this.expertRepository,
            this.jwt,
            this.nodemailer,
            email,
            name,
            token

        );
    }

    async validateAccessToken({ token }: { token: string }) {
        return validateAccessToken(
            this.expertRepository,
            token,
            this.jwt,
        )
    }

    async resetPassword({ id, password }: { id: string, password: string }) {
        return resetPassword(
            this.expertRepository,
            this.requestValidator,
            this.bcrypt,
            id,
            password
        )
    }

}