import express, { NextFunction, Request, Response } from 'express';
import userAdapter from './injections/userInjection';

const router = express.Router()

export default router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.createUser(req, res, next)
)