import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import IHashPassword from "../../interface/services/IHashPassword";
import IJwt from "../../interface/services/IJwt";
import { IUserResponse } from "../../interface/services/IResponse";

export const loginUser = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt: IJwt,
    email: string,
    password: string
): Promise<IUserResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { email, password },
            ["email", "password"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const user: IUser | null = await userRepository.findUser(email);

        if (user && user._id) {
            if (user.isBlocked) {
                throw ErrorResponse.badRequest("Your account is blocked");
            }
            const match: boolean = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.createJWT(user._id, user.email, "user", user.name);
                const userResponse = { ...user, password: "" };
                return {
                    status: 200,
                    success: true,
                    token: token,
                    data: userResponse,
                    message: `Login successful. Welcome ${user.name}`,
                };
            }
            throw ErrorResponse.badRequest("Invalid credentials");
        }
        throw ErrorResponse.notFound("Invalid credentials");
    } catch (err) {
        console.error("Login error:", err);
        throw err;
    }
};
