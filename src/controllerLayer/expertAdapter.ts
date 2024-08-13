// backend\src\controllerLayer\expertAdapter.ts

import { IExpert } from '../domainLayer/expert';
import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import ErrorResponse from '../usecaseLayer/handler/errorResponse';
import { ExpertUsecase } from '../usecaseLayer/usecase/expertUsecase'


export class ExpertAdapter {
    private readonly expertUsecase: ExpertUsecase

    constructor(expertUsecase: ExpertUsecase) {
        this.expertUsecase = expertUsecase
    }

    // @desc    Register new expert
    // route    POST api/expert/singup
    // @access  Public
    async createExpert(req: Req, res: Res, next: Next) {
        try {
            const newExpert = await this.expertUsecase.createExpert(req.body);
            console.log('newExpert in the expertAdapter: ', newExpert)
            if (newExpert) {
                return res.status(newExpert.status).json({
                    success: newExpert.success,
                    message: newExpert.message,
                });
            }
            throw ErrorResponse.internalServerError("Expert creation failed");
        } catch (error) {
            next(error)
        }
    }

    // @desc      Login expert
    // route      POST api/expert/login
    // @access    Public
    async loginExpert(req: Req, res: Res, next: Next) {
        try {
            const expert = await this.expertUsecase.loginExpert(req.body);
            if (expert) {
                res.cookie("expertjwt", expert.token, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === "production",
                });
                // console.log(expert.data)

                return res.status(expert.status).json({
                    success: expert.success,
                    data: expert.data,
                    message: expert.message,
                });
            }
            throw ErrorResponse.unauthorized("Login failed");
        } catch (err) {
            next(err);
        }
    }

    async logoutExpert(req: Req, res: Res, next: Next) {
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

    // @desc    Update expert profile
    // route    PUT api/expert/profile
    // @access  Private
    async updateProfile(req: Req, res: Res, next: Next) {
        try {
            const expert = await this.expertUsecase.updateProfile(req.body);
            expert &&
                res.status(expert.status).json({
                    success: expert.success,
                    message: expert.message,
                    expert: expert.data,
                });
        } catch (error) {
            next(error)
        }
    }

    //@desc     Forgot password save
    //route     POST api/expert/forgotPassword
    //@access   Public
    async forgotPassword(req: Req, res: Res, next: Next) {
        try {
            const newExpert = await this.expertUsecase.forgotPassword(req.body);
            console.log("expertAdapter,newExpert :", newExpert)
            newExpert &&
                res.cookie("expertjwt", newExpert.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });

            res.status(newExpert.status).json({
                success: newExpert.success,
                message: newExpert.message,
                expert: newExpert.data,
            });
        } catch (err) {
            next(err);
        }
    }

    async validateAccessToken(req: Req, res: Res, next: Next) {
        try {
            console.log('--> expertAdapter/validateAccessToken');
            const newExpert = await this.expertUsecase.validateAccessToken(req.body);
            newExpert &&
                res.cookie("expertjwt", newExpert.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
            res.status(newExpert.status).json({
                success: newExpert.success,
                message: newExpert.message,
                expert: newExpert.data,
            });
        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req: Req, res: Res, next: Next) {
        try {
            const newExpert = await this.expertUsecase.resetPassword(req.body);
            newExpert &&
                res.cookie("expertjwt", newExpert.token, {
                    httpOnly: true,
                    sameSite: "strict", // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
            res.status(newExpert.status).json({
                success: newExpert.success,
                message: newExpert.message,
                expert: newExpert.data,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      fetch expert data
    // route      POST api/expert/getExpertData
    // @access    Private
    async getExpertData(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                expertData.password = '';
                return res.status(200).json({
                    success: true,
                    data: expertData,
                    message: `Welcome ${expertData.name}`,
                });
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Categories with pagination
    // route      GET api/expert/category
    // @access    Private
    async getCategories(req: Req, res: Res, next: Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const categories = await this.expertUsecase.getCategories(page, limit);
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

    // @desc      fetch data of user for the expert
    // route      POST api/expert/getUserData
    // @access    Private
    async expertGetUserData(req: Req, res: Res, next: Next) {
        try {
            const userId = req.params.userId;
            const user = await this.expertUsecase.expertGetUserData(userId);
            if (user) {
                return res.status(user.status).json({
                    success: user.success,
                    data: user.data,
                    message: user.message,
                });
            }
        } catch (err) {
            next(err);
        }
    }
}