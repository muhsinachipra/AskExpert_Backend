// backend\src\infrastructureLayer\route\userRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { userController } from './injections/userInjection';
import { appointmentController } from './injections/appointmentInjection';
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = express.Router()

router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
        userController.createUser(req, res, next)
)

router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) =>
        userController.loginUser(req, res, next)
)

router.post(
    "/sendOTP",
    (req: Request, res: Response, next: NextFunction) =>
        userController.sendOTP(req, res, next)
)

router.post(
    "/verifyOTP",
    (req: Request, res: Response, next: NextFunction) =>
        userController.emailVerification(req, res, next)
);

// route user google auth
router.post(
    "/googleAuth",
    (req: Request, res: Response, next: NextFunction) =>
        userController.googleAuth(req, res, next)
);

//routes for forgot password save
router.post(
    "/forgotPassword",
    (req: Request, res: Response, next: NextFunction) =>
        userController.forgotPassword(req, res, next)
);

router.post(
    "/validateAccessToken",
    (req: Request, res: Response, next: NextFunction) =>
        userController.validateAccessToken(req, res, next)
);

router.post(
    "/resetPassword",
    (req: Request, res: Response, next: NextFunction) =>
        userController.resetPassword(req, res, next)
);

router.post(
    "/webhook",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.webhook(req, res, next)
)

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        userController.getCategories(req, res, next)
)

router.get(
    "/getExpertsByCategory/:categoryName",
    (req: Request, res: Response, next: NextFunction) =>
        userController.getExpertsByCategory(req, res, next)
)

// Use protectUser middleware for routes accessible only to authenticated users
router.use(AuthMiddleware.authenticateUser);

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        userController.logoutUser(req, res, next)
)

router.patch(
    "/updateProfile",
    (req: Request, res: Response, next: NextFunction) =>
        userController.updateProfile(req, res, next)
);

router.get(
    "/getUserData",
    (req: Request, res: Response, next: NextFunction) =>
        userController.getUserData(req, res, next)
)

router.get(
    "/getExpertSlots/:expertId/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getExpertSlots(req, res, next)
)

router.patch(
    "/cancelAppointment/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.cancelAppointment(req, res, next)
)

router.post(
    "/payment",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.payment(req, res, next)
)

router.get(
    "/getUserAppointments",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getUserAppointments(req, res, next)
)

router.get(
    "/getUserAppointmentsHistory",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getUserAppointmentsHistory(req, res, next)
)

router.get(
    "/getExpertData/:expertId",
    (req: Request, res: Response, next: NextFunction) =>
        userController.userGetExpertData(req, res, next)
)

router.post(
    "/walletPayment",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.walletPayment(req, res, next)
)

router.patch(
    "/updateAppointmentStatus/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.updateAppointmentStatus(req, res, next)
)

router.get(
    "/getAppointmentsCount",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getAppointmentsCount(req, res, next)
)

router.get(
    "/getSingleAppointment/:appointmentId",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getSingleAppointment(req, res, next)
)

router.post(
    "/review",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.review(req, res, next)
)

router.post(
    "/report",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.report(req, res, next)
)

router.get(
    "/getWalletData/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getUserWalletData(req, res, next)
)


export default router