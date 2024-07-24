// backend\src\usecaseLayer\usecase\user\googleAuth.ts

import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IHashpassword from "../../interface/services/IBcrypt";
import Ijwt from "../../interface/services/IJwt";
import { IResponse, } from "../../interface/services/IResponse";


export const googleAuth = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    name: string,
    email: string,
    password: string,
    profilePic: string,
): Promise<IResponse> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { name, email, password, profilePic },
            ["name", "email", "password", 'profilePic']
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const user = await userRepository.findUser(email);

        if (!user) {
            const hashedPassword = await bcrypt.createHash(password);
            const newUser = {
                name,
                email,
                password: hashedPassword,
                profilePic,
            };
            const createnewUser = await userRepository.createUser(newUser);
            const token = jwt.createJWT(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);

            return {
                status: 200,
                success: true,
                message: `Register Successful, Welcome ${createnewUser.name}`,
                token: token,
                data: createnewUser
            };
        }

        if (user && user._id) {
            if (user.isBlocked) {
                throw ErrorResponse.badRequest("You account is blocked");
            }
            const token = jwt.createJWT(user._id, user.email, "user", user.name);

            user.password = ""

            return {
                status: 200,
                success: true,
                token: token,
                data: user,
                message: `Welcome ${user.name}`,
            };
        }
        throw ErrorResponse.internalServerError("Unexpected error occurred");
    } catch (err) {
        throw err;
    }

}
