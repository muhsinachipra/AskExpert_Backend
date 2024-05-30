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
    category: string,
    experience: number,
    rate: number,
    profilePic: string,
    resume: string,
): Promise<IResponse> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { name, mobile, email, password },
            ['name', 'mobile', 'email', 'password']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const expert = await expertRepository.findExpert(email);
        if (!expert) {
            const hashedPassword = await bcrypt.createHash(password)
            const newExpert = {
                name,
                mobile,
                email,
                password: hashedPassword,
            }
            const createNewExpert = await expertRepository.createExpert(newExpert)
            return {
                status: 200,
                success: true,
                message: "Successfully created"
            }
        }
        throw ErrorResponse.badRequest("Expert already exists")

    } catch (err) {
        throw err
    }
}