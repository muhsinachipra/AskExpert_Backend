// backend\src\infrastructureLayer\route\expertRoutes.ts

import express, { NextFunction, Request, Response } from 'express';
import { expertAdapter } from './injections/expertInjection';
import AuthMiddleware from '../middleware/AuthMiddleware';
import { appointmentAdapter } from './injections/appointmentInjection';

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

router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.logoutExpert(req, res, next)
)

router.patch(
    "/updateProfile",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.updateProfile(req, res, next)
);

router.post(
    '/schedules',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.addSchedule(req, res, next)
)

router.get(
    '/schedules/:page/:limit',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getSchedules(req, res, next)
);

router.delete(
    '/schedules/:id',
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.cancelSchedule(req, res, next)
);

router.get(
    "/getExpertData",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.getExpertData(req, res, next)
)

router.get(
    "/getAppointmentsData/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getAppointmentsData(req, res, next)
)

router.get(
    "/categories",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.getCategories(req, res, next)
)

router.get(
    "/getWalletData/:page/:limit",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.getWalletData(req, res, next)
)

router.get(
    "/getUserData/:userId",
    (req: Request, res: Response, next: NextFunction) =>
        expertAdapter.expertGetUserData(req, res, next)
)

router.patch(
    "/updateAppointmentStatus/:id",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.updateAppointmentStatus(req, res, next)
)

router.get(
    "/review",
    (req: Request, res: Response, next: NextFunction) =>
        appointmentAdapter.expertGetReview(req, res, next)
)

export default router