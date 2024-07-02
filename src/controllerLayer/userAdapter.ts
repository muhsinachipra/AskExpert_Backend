// backend\src\controllerLayer\userAdapter.ts

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
                console.log(user.data)

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

    // @desc    Signin or SignUp using google auth
    //route     POST api/user/googleAuth
    //@access   Public
    async googleAuth(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.googleAuth(req.body);
            if (!user) {
                throw ErrorResponse.unauthorized("Login failed");
            }
            res.cookie("userjwt", user.token, {
                httpOnly: true,
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                secure: process.env.NODE_ENV === "production",
            });

            return res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
            });
        } catch (err) {
            next(err);
        }
    }
    // async googleAuth(req: Req, res: Res, next: Next) {
    //     try {
    //         const user = await this.userUsecase.googleAuth(req.body);
    //         user &&
    //             res.cookie("userjwt", user.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict", // Prevent CSRF attacks
    //                 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //             });

    //         res.status(user.status).json({
    //             success: user.success,
    //             data: user.data,
    //             message: user.message,
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }


    //@desc     send otp to new user email
    //route     POST api/user/sendOTP
    //@access   Public
    async sendOTP(req: Req, res: Res, next: Next) {
        console.log('--> userAdapter/sendOTP');

        try {
            const user = await this.userUsecase.sendOTP(req.body);
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

    //@desc     Forgot password save
    //route     POST api/user/forgotPassword
    //@access   Public
    async forgotPassword(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.forgotPassword(req.body);
            console.log("userAdapter,newUser :", newUser)
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

    async validateAccessToken(req: Req, res: Res, next: Next) {
        try {
            console.log('--> userAdapter/validateAccessToken');
            const newUser = await this.userUsecase.validateAccessToken(req.body);
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

    async resetPassword(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.resetPassword(req.body);
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

    async logoutUser(req: Req, res: Res, next: Next) {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                sameSite: 'strict', // Strictly same site for CSRF protection
                expires: new Date(0),
            });
            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            next(err);
        }
    }

    // @desc    Update user profile
    // route    PUT api/user/profile
    // @access  Private
    async updateProfile(req: Req, res: Res, next: Next) {
        try {
            // console.log('req from updateProfile userAdapter : ', req)
            // console.log('res from updateProfile userAdapter : ', res)
            const user = await this.userUsecase.updateProfile(req.body);
            console.log('user from updateProfile userAdapter............ : ', user)
            user &&
                res.status(user.status).json({
                    success: user.success,
                    message: user.message,
                    user: user.data,
                });
        } catch (error) {
            next(error)
        }
    }

    // @desc      fetch user data
    // route      POST api/user/getUserData
    // @access    Private
    async getUserData(req: Req, res: Res, next: Next) {
        try {
            const token = req.cookies.userjwt;
            const user = await this.userUsecase.getUserData(token);
            if (user) {
                console.log(user.data)

                return res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                });
            }
            throw ErrorResponse.unauthorized("Failed to fetch user data");
        } catch (err) {
            next(err);
        }
    }

    // @desc      fetch data of experts in same category
    // route      POST api/user/getExpertsByCategory
    // @access    Private
    async getExpertsByCategory(req: Req, res: Res, next: Next) {
        try {
            // console.log('getExpertsByCategory called.........')
            const categoryName = req.params.categoryName;
            // console.log('categoryName in getExpertsByCategory : ', categoryName)
            const experts = await this.userUsecase.getExpertsByCategory(categoryName);
            // console.log('experts in getExpertsByCategory : ', experts)
            if (experts) {
                return res.status(experts.status).json({
                    success: experts.success,
                    data: experts.data,
                    message: experts.message,
                });
            }
        } catch (err) {
            next(err);
        }
    }

}
