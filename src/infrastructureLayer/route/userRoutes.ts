// backend\src\infrastructureLayer\route\userRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { userAdapter } from './injections/userInjection';
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = express.Router()

router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.createUser(req, res, next)
)

router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.loginUser(req, res, next)
)

router.post(
    "/sendOTP",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.sendOTP(req, res, next)
)

router.post(
    "/verifyOTP",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.emailVerification(req, res, next)
);

// route user google auth
router.post(
    "/googleAuth",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.googleAuth(req, res, next)
);

//routes for forgot password save
router.post(
    "/forgotPassword",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.forgotPassword(req, res, next)
);

router.post(
    "/validateAccessToken",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.validateAccessToken(req, res, next)
);

router.post(
    "/resetPassword",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.resetPassword(req, res, next)
);

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.logoutUser(req, res, next)
)

router.patch(
    "/updateProfile",
    AuthMiddleware.protectUser,
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.updateProfile(req, res, next)
);

export default router