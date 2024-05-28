// backend\src\infrastructureLayer\route\adminRoutes.ts

// import express from 'express';
// import { loginAdminController } from '../../controllerLayer/adminAdapter'; // Update with the correct path to your controller

// const router = express.Router();

// router.post('/login', loginRateLimiter, loginAdminController); // Apply rate limiter to the login route

// export default router;


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

router.post("/logout", (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.logoutAdmin(req, res, next)
)

export default router