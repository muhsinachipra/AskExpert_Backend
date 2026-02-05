// backend\src\infrastructureLayer\route\adminRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { adminController } from './injections/adminInjection';
import { appointmentController } from './injections/appointmentInjection';
import loginRateLimiter from '../middleware/rateLimiter';
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = express.Router()


router.post(
    "/login",
    loginRateLimiter, // Apply rate limiter to the login route
    (req: Request, res: Response, next: NextFunction) =>
        adminController.loginAdmin(req, res, next)
)

// Protect routes with admin authentication middleware
router.use(AuthMiddleware.authenticateAdmin);

// Routes accessible only to authenticated admins
router.get(
    "/expertData",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getExpertData(req, res, next)
)

router.get(
    "/expertDataReport",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getExpertDataSortByReport(req, res, next)
)

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.logoutAdmin(req, res, next)
)

router.patch(
    '/verifyExpert/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.updateExpertVerification(req, res, next)
)

router.post(
    '/sendVerifiedEmail/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.sendVerifiedEmail(req, res, next)
)

router.post(
    '/addCategory',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.addCategory(req, res, next)
)

router.patch(
    '/editCategory',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.editCategory(req, res, next)
)

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getCategories(req, res, next)
)

router.get(
    "/userData",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getUserData(req, res, next)
)

router.patch(
    '/userBlockedStatus/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.updateUserBlockedStatus(req, res, next)
)

router.get(
    "/getAdminData",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getAdminData(req, res, next)
)

router.patch(
    '/expertBlockedStatus/:id',
    (req: Request, res: Response, next: NextFunction) =>
        adminController.updateExpertBlockedStatus(req, res, next)
)

router.get(
    "/appointmentData",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.allAppointmentsData(req, res, next)
)

router.get(
    "/report/:expertId",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.reportByExpertId(req, res, next)
)

router.get(
    "/dashboard",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.getDashboardData(req, res, next)
)

router.get(
    "/expertsByCategory",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.expertsByCategory(req, res, next)
)

router.get(
    "/userCount",
    (req: Request, res: Response, next: NextFunction) =>
        adminController.userCount(req, res, next)
)

export default router