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
                console.log(user)

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


    //@desc     send otp to new user email
    //route     POST api/user/sendEmail
    //@access   Public
    async sendEmail(req: Req, res: Res, next: Next) {
        console.log('--> userAdapter/sendEmail');

        try {
            const user = await this.userUsecase.verifyEmail(req.body);
            res.status(user.status).json({
                success: user.success,
                message: user.message,
            });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Checking the otp valid or not
    //route     POST api/user/emailVerification
    //@access   Public
    async emailVerification(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.emailVerification(req.body);
            user &&
                res.status(user.status).json({
                    success: user.success,
                    // data: user.data,
                    message: user.message,
                });
        } catch (err) {
            next(err);
        }
    }

    // @desc    Signin or SignUp using google auth
    //route     POST api/user/googleAuth
    //@access   Public
    async googleAuth(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.googleAuth(req.body);
            user &&
                res.cookie("userjwt", user.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });

            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
            });
        } catch (err) {
            next(err);
        }
    }

    //@desc     send ottp to forget password
    //route     POST api/user/sendOtpForgotPassword
    //@access   Public
    async sendOtpForgotPassword(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.sendOtpForgotPassword(req.body);
            res.status(user.status).json({
                success: user.success,
                message: user.message,
            });
        } catch (err) {
            next(err);
        }
    }

    //@desc     Forgot password save
    //route     POST api/user/forgotPassword
    //@access   Public
    async forgotPassword(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.forgotPassword(req.body);
            newUser &&
                res.cookie("userjwt", newUser.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });

            res.status(newUser.status).json({
                success: newUser.success,
                message: newUser.message,
                user: newUser.data,
            });
        } catch (err) {
            next(err);
        }
    }

}