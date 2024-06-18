// backend\src\controllerLayer\adminAdapter.ts

import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import ErrorResponse from '../usecaseLayer/handler/errorResponse';
import { AdminUsecase } from '../usecaseLayer/usecase/adminUsecase'


export class AdminAdapter {
    private readonly adminUsecase: AdminUsecase

    constructor(adminUsecase: AdminUsecase) {
        this.adminUsecase = adminUsecase // using dependency injection to call the adminUsecase
    }

    // @desc      Login admin
    // route      POST api/admin/login
    // @access    Public
    async loginAdmin(req: Req, res: Res, next: Next) {
        try {
            const admin = await this.adminUsecase.loginAdmin(req.body);
            if (admin) {
                res.cookie("adminjwt", admin.token, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === "production",
                });
                console.log(admin.data)

                return res.status(admin.status).json({
                    success: admin.success,
                    data: admin.data,
                    message: admin.message,
                });
            }
            throw ErrorResponse.unauthorized("Login failed");
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get expert data with pagination
    // route      GET api/admin/expertData
    // @access    Private
    async getExpertData(req: Req, res: Res, next: Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const expertData = await this.adminUsecase.getExpertData(page, limit);
            return res.status(expertData.status).json({
                success: expertData.success,
                data: expertData.data,
                total: expertData.total,
                message: expertData.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      Toggle expert isVerified
    // route      PATCH api/admin/verifyExpert/:id
    // @access    Private
    async updateExpertVerification(req: Req, res: Res, next: Next) {
        try {
            const expertId = req.params.id;
            const response = await this.adminUsecase.toggleExpertVerification(expertId);
            return res.status(response.status).json(response);
        } catch (err) {
            next(err);
        }
    }

    // @desc      Logout admin
    // route      POST api/admin/logout
    // @access    Private
    async logoutAdmin(req: Req, res: Res, next: Next) {
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

    // @desc      send email to expert about verification
    // route      POST api/admin/sendVerifiedEmail/:id
    // @access    Private
    async sendVerifiedEmail(req: Req, res: Res, next: Next) {
        try {
            const expertId = req.params.id;
            const response = await this.adminUsecase.sendVerifiedEmail(expertId);
            res.status(response.status).json({
                success: response.success,
                message: response.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      add category of experts
    // route      POST api/admin/addCategory
    // @access    Private
    async addCategory(req: Req, res: Res, next: Next) {
        try {
            console.log('addCategory req.body:', req.body);
            const response = await this.adminUsecase.addCategory(req.body);
            console.log('addCategory response:', response);
            res.status(response.status).json({
                success: response.success,
                message: response.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Categories with pagination
    // route      GET api/admin/expertData
    // @access    Private
    async getCategories(req: Req, res: Res, next: Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const categories = await this.adminUsecase.getCategories(page, limit);
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