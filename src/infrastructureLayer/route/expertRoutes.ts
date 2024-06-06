// backend\src\infrastructureLayer\route\expertRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { expertAdapter } from './injections/expertInjection';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = express.Router()

router.post(
    "/register",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.createExpert(req, res, next)
)

router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.loginExpert(req, res, next)
)

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.logoutExpert(req, res, next)
)

router.post(
    "/forgotPassword",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.forgotPassword(req, res, next)
);

router.post(
    "/validateAccessToken",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.validateAccessToken(req, res, next)
);

router.post(
    "/resetPassword",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.resetPassword(req, res, next)
);

router.use(AuthMiddleware.authenticateExpert);

router.patch(
    "/updateProfile",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.updateProfile(req, res, next)
);

export default router