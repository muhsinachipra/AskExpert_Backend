// backend\src\controllerLayer\userAdapter.ts

import { IUser } from '../domainLayer/user';
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
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: true,
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
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
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
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: true,
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
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: true
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
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: true
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
                secure: true,
                sameSite: 'none',
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
            console.log('req.body from updateProfile userAdapter : ', req.body)
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
            if (req.user && 'mobile' in req.user) {
                // console.log('refetching user data userAdapter...')
                const userData = req.user as IUser;
                userData.password = '';
                return res.status(200).json({
                    success: true,
                    data: userData,
                    message: `Welcome ${userData.name}`,
                });
            } else {
                throw ErrorResponse.notFound('User not found');
            }
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

    // @desc      fetch data of expert for the user to show in the appointments page
    // route      POST api/user/getExpertData
    // @access    Private
    async userGetExpertData(req: Req, res: Res, next: Next) {
        try {
            const expertId = req.params.expertId;
            const expert = await this.userUsecase.userGetExpertData(expertId);
            if (expert) {
                return res.status(expert.status).json({
                    success: expert.success,
                    data: expert.data,
                    message: expert.message,
                });
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Categories with pagination
    // route      GET api/user/expertData
    // @access    Private
    async getCategories(req: Req, res: Res, next: Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const categories = await this.userUsecase.getCategories(page, limit);
            return res.status(categories.status).json({
                success: categories.success,
                data: categories.data,
                total: categories.total,
                message: categories.message,
            });
        } catch (err) {
            next(err);
        }
    }


}
