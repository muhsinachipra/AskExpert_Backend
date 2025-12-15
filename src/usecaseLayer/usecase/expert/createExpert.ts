// backend\src\usecaseLayer\usecase\expert\createExpert.ts

// import { Types } from 'mongoose'
import ErrorResponse from '../../handler/errorResponse'
import { IExpertRepository } from "../../interface/repository/IExpertRepository"
import { IRequestValidator } from '../../interface/repository/IValidateRepository'
import IHashpassword from '../../interface/services/IBcrypt'
import { IResponse } from "../../interface/services/IResponse"

export const createExpert = async (
    requestValidator: IRequestValidator,
    expertRepository: IExpertRepository,
    bcrypt: IHashpassword,
    name: string,
    email: string,
    password: string,
    // category: Types.ObjectId,
    category: string,
    experience: number,
    mobile: string,
    profilePic: string,
    resume: string
): Promise<IResponse> => {
    try {

        console.log(' name, email, password, category, experience, mobile, profilePic, resume ', name, email, password, category, experience, mobile, profilePic, resume)

        const validation = requestValidator.validateRequiredFields(
            { name, email, password, category, experience, mobile, profilePic, resume },
            ['name', 'email', 'password', 'category', 'experience', 'mobile', 'profilePic', 'resume']
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const expert = await expertRepository.findExpert(email);
        // console.log('expert in createExpert', expert)

        if (!expert) {
            const hashedPassword = await bcrypt.createHash(password);

            const newExpert = {
                name,
                email,
                password: hashedPassword,
                category,
                experience,
                mobile,
                profilePic,
                resume
            };

            // console.log('newExpert in createExpert', newExpert)

            await expertRepository.createExpert(newExpert);

            return {
                status: 200,
                success: true,
                message: "Successfully created"
            };
        }

        throw ErrorResponse.badRequest("Expert already exists");
    } catch (err) {
        throw err;
    }
};