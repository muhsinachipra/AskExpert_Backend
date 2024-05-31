// backend\src\controllerLayer\expertAdapter.ts

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

    // // @desc      Login expert
    // // route      POST api/expert/login
    // // @access    Public
    // async loginExpert(req: Req, res: Res, next: Next) {
    //     try {
    //         const expert = await this.expertUsecase.loginExpert(req.body);
    //         if (expert) {
    //             res.cookie("expertjwt", expert.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict",
    //                 maxAge: 30 * 24 * 60 * 60 * 1000,
    //                 secure: process.env.NODE_ENV === "production",
    //             });
    //             console.log(expert.data)

    //             return res.status(expert.status).json({
    //                 success: expert.success,
    //                 data: expert.data,
    //                 message: expert.message,
    //             });
    //         }
    //         throw ErrorResponse.unauthorized("Login failed");
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // // @desc    Signin or SignUp using google auth
    // //route     POST api/expert/googleAuth
    // //@access   Public
    // async googleAuth(req: Req, res: Res, next: Next) {
    //     try {
    //         const expert = await this.expertUsecase.googleAuth(req.body);
    //         if (expert) {
    //             res.cookie("expertjwt", expert.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict", // Prevent CSRF attacks
    //                 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //                 secure: process.env.NODE_ENV === "production",
    //             });

    //             res.status(expert.status).json({
    //                 success: expert.success,
    //                 data: expert.data,
    //                 message: expert.message,
    //             });
    //         }
    //         throw ErrorResponse.unauthorized("Login failed");
    //     } catch (err) {
    //         next(err);
    //     }
    // }




    // //@desc     Forgot password save
    // //route     POST api/expert/forgotPassword
    // //@access   Public
    // async forgotPassword(req: Req, res: Res, next: Next) {
    //     try {
    //         const newExpert = await this.expertUsecase.forgotPassword(req.body);
    //         console.log("expertAdapter,newExpert :", newExpert)
    //         newExpert &&
    //             res.cookie("expertjwt", newExpert.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict", // Prevent CSRF attacks
    //                 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //             });

    //         res.status(newExpert.status).json({
    //             success: newExpert.success,
    //             message: newExpert.message,
    //             expert: newExpert.data,
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // async validateAccessToken(req: Req, res: Res, next: Next) {
    //     try {
    //         console.log('--> expertAdapter/validateAccessToken');
    //         const newExpert = await this.expertUsecase.validateAccessToken(req.body);
    //         newExpert &&
    //             res.cookie("expertjwt", newExpert.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict", // Prevent CSRF attacks
    //                 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //             });
    //         res.status(newExpert.status).json({
    //             success: newExpert.success,
    //             message: newExpert.message,
    //             expert: newExpert.data,
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // async resetPassword(req: Req, res: Res, next: Next) {
    //     try {
    //         const newExpert = await this.expertUsecase.resetPassword(req.body);
    //         newExpert &&
    //             res.cookie("expertjwt", newExpert.token, {
    //                 httpOnly: true,
    //                 sameSite: "strict", // Prevent CSRF attacks
    //                 maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //             });
    //         res.status(newExpert.status).json({
    //             success: newExpert.success,
    //             message: newExpert.message,
    //             expert: newExpert.data,
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // async logoutExpert(req: Req, res: Res, next: Next) {
    //     try {
    //         res.cookie("jwt", "", {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    //             sameSite: 'strict', // Strictly same site for CSRF protection
    //             expires: new Date(0),
    //         });
    //         res.status(200).json({ message: "Logged out successfully" });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

}