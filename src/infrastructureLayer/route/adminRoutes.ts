// backend\src\infrastructureLayer\route\adminRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { adminAdapter } from './injections/adminInjection';
import loginRateLimiter from '../middleware/rateLimiter';

const router = express.Router()


router.post(
    "/login",
    loginRateLimiter, // Apply rate limiter to the login route
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.loginAdmin(req, res, next)
)

router.get(
    "/expertData",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getExpertData(req, res, next)
)

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.logoutAdmin(req, res, next)
)

router.patch(
    '/verifyExpert/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.updateExpertVerification(req, res, next)
)

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.logoutAdmin(req, res, next)
)

router.post(
    '/sendVerifiedEmail/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.sendVerifiedEmail(req, res, next)
)

export default router