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

export default router