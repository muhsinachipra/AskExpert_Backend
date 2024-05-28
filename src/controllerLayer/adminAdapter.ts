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

}