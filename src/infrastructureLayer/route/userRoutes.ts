// backend\src\infrastructureLayer\route\userRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { userAdapter } from './injections/userInjection';
import { appointmentAdapter } from './injections/appointmentInjection';
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
    "/webhook",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.webhook(req, res, next)
)

// Use protectUser middleware for routes accessible only to authenticated users
router.use(AuthMiddleware.authenticateUser);

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.logoutUser(req, res, next)
)

router.patch(
    "/updateProfile",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.updateProfile(req, res, next)
);

router.get(
    "/getUserData",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.getUserData(req, res, next)
)

router.get(
    "/getExpertsByCategory/:categoryName",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.getExpertsByCategory(req, res, next)
)

router.get(
    "/getExpertSlots/:expertId/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getExpertSlots(req, res, next)
)

router.patch(
    "/cancelAppointment/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.cancelAppointment(req, res, next)
)

router.post(
    "/payment",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.payment(req, res, next)
)

router.get(
    "/getUserAppointments",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getUserAppointments(req, res, next)
)

router.get(
    "/getExpertData/:expertId",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.userGetExpertData(req, res, next)
)

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        userAdapter.getCategories(req, res, next)
)

router.post(
    "/walletPayment",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.walletPayment(req, res, next)
)

router.patch(
    "/updateAppointmentStatus/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.updateAppointmentStatus(req, res, next)
)

router.get(
    "/getAppointmentsCount",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getAppointmentsCount(req, res, next)
)

export default router