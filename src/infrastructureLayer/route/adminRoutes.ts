// backend\src\infrastructureLayer\route\adminRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { adminAdapter } from './injections/adminInjection';
import { appointmentAdapter } from './injections/appointmentInjection';
import loginRateLimiter from '../middleware/rateLimiter';
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = express.Router()


router.post(
    "/login",
    loginRateLimiter, // Apply rate limiter to the login route
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.loginAdmin(req, res, next)
)

// Protect routes with admin authentication middleware
router.use(AuthMiddleware.authenticateAdmin);

// Routes accessible only to authenticated admins
router.get(
    "/expertData",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getExpertData(req, res, next)
)

router.get(
    "/expertDataReport",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getExpertDataSortByReport(req, res, next)
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
    '/sendVerifiedEmail/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.sendVerifiedEmail(req, res, next)
)

router.post(
    '/addCategory',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.addCategory(req, res, next)
)

router.patch(
    '/editCategory',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.editCategory(req, res, next)
)

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getCategories(req, res, next)
)

router.get(
    "/userData",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getUserData(req, res, next)
)

router.patch(
    '/userBlockedStatus/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.updateUserBlockedStatus(req, res, next)
)

router.get(
    "/getAdminData",
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.getAdminData(req, res, next)
)

router.patch(
    '/expertBlockedStatus/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminAdapter.updateExpertBlockedStatus(req, res, next)
)

router.get(
    "/appointmentData",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.allAppointmentsData(req, res, next)
)

router.get(
    "/report/:expertId",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.reportByExpertId(req, res, next)
)

export default router