import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import ErrorResponse from '../usecaseLayer/handler/errorResponse';
import { UserUsecase } from '../usecaseLayer/usecase/userUsecase'


export class UserAdapter {
    private readonly userUsecase: UserUsecase

    constructor(userUsecase: UserUsecase) {
        this.userUsecase = userUsecase
    }

    // @desc    Register new user
    // route    POST api/user/singup
    // @access  Public
    async createUser(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.createUser(req.body);
            if (newUser) {
                return res.status(newUser.status).json({
                    success: newUser.success,
                    message: newUser.message,
                });
            }
            throw ErrorResponse.internalServerError("User creation failed");
        } catch (error) {
            next(error)
        }
    }


    // @desc      Login user
    // route      POST api/user/login
    // @access    Public
    async loginUser(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.loginUser(req.body);
            if (user) {
                res.cookie("userjwt", user.token, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === "production",
                });

                return res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                });
            }
            throw ErrorResponse.unauthorized("Login failed");
        } catch (err) {
            next(err);
        }
    }

}