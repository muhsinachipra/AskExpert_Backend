import express, { NextFunction, Request, Response } from 'express';
import { userAdapter } from './injections/userInjection';

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
    "/sendEmail",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.sendEmail(req, res, next)
)

router.post(
    "/verifyEmail",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.emailVerification(req, res, next)
);

// route user google auth
router.post(
    "/googleAuth",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.googleAuth(req, res, next)
);

export default router