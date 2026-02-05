// backend\src\infrastructureLayer\route\expertRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { expertController } from './injections/expertInjection';
import AuthMiddleware from '../middleware/AuthMiddleware';
import { appointmentController } from './injections/appointmentInjection';

const router = express.Router()

router.post(
    "/register",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.createExpert(req, res, next)
)

router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.loginExpert(req, res, next)
)

router.post(
    "/forgotPassword",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.forgotPassword(req, res, next)
);

router.post(
    "/validateAccessToken",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.validateAccessToken(req, res, next)
);

router.post(
    "/resetPassword",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.resetPassword(req, res, next)
);

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.getCategories(req, res, next)
)

router.use(AuthMiddleware.authenticateExpert);

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.logoutExpert(req, res, next)
)

router.patch(
    "/updateProfile",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.updateProfile(req, res, next)
);

router.post(
    '/schedules',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.addSchedule(req, res, next)
)

router.get(
    '/schedules/:page/:limit',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getSchedules(req, res, next)
);

router.delete(
    '/schedules/:id',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.cancelSchedule(req, res, next)
);

router.get(
    "/getExpertData",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.getExpertData(req, res, next)
)

router.get(
    "/getAppointmentsData/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getAppointmentsData(req, res, next)
)

router.get(
    "/getWalletData/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.getWalletData(req, res, next)
)

router.get(
    "/getUserData/:userId",
    (req: Request, res: Response, next: NextFunction) =>
        expertController.expertGetUserData(req, res, next)
)

router.patch(
    "/updateAppointmentStatus/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.updateAppointmentStatus(req, res, next)
)

router.get(
    "/review",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentController.expertGetReview(req, res, next)
)

export default router