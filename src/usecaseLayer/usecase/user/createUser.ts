import ErrorResponse from '../../handler/errorResponse'
import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IRequestValidator } from '../../interface/repository/IValidateRepository'
import IHashpassword from '../../interface/services/IHashPassword'
import { Response } from "../../interface/services/IResponse"

export const createUser = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    name: string,
    mobile: string,
    email: string,
    password: string
): Promise<Response> => {
    try {

        const validation = requestValidator.validateRequiredFields(
            { name, mobile, email, password },
            ['name', 'mobile', 'email', 'password']
        )

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        const user = await userRepository.findUser(email);
        if (!user) {
            const hashedPassword = await bcrypt.createHash(password)
            const newUser = {
                name,
                mobile,
                email,
                password: hashedPassword,
            }
            const createNewUser = await userRepository.createUser(newUser)
            return {
                status: 200,
                success: true,
                message: "Successfully created"
            }
        }
        throw ErrorResponse.badRequest("User already exists")

    } catch (err) {
        throw err
    }
}