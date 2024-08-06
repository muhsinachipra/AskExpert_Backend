// backend\src\controllerLayer\AppointmentAdapter.ts

import { IExpert } from '../domainLayer/expert'
import { IUser } from '../domainLayer/user'
import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import ErrorResponse from '../usecaseLayer/handler/errorResponse'
import { AppointmentUsecase } from '../usecaseLayer/usecase/appointmentUsecase'


export class AppointmentAdapter {
    private readonly appointmentUsecase: AppointmentUsecase

    constructor(appointmentUsecase: AppointmentUsecase) {
        this.appointmentUsecase = appointmentUsecase // using dependency injection to call the appointmentUsecase
    }


    // @desc      schedule appointment by experts
    // route      POST api/expert/schedules
    // @access    Private
    async addSchedule(req: Req, res: Res, next: Next) {
        try {
            // Narrowing the type of req.user
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                // console.log('req.body in AppointmentAdapter : ', req.body, 'expertData : ', expertData)
                const response = await this.appointmentUsecase.addSchedule(req.body, expertData);
                // console.log('response from addSchedule in AppointmentAdapter : ', response)
                res.status(response.status).json({
                    success: response.success,
                    message: response.message,
                });
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Schedules data
    // route      GET api/expert/schedules
    // @access    Private
    async getSchedules(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                const expertId = expertData._id;
                const page = parseInt(req.params.page as string) || 1;
                const limit = parseInt(req.params.limit as string) || 4;
                const schedules = await this.appointmentUsecase.getSchedules(expertId || '', page, limit);
                return res.status(schedules.status).json(schedules)
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Cancel a schedule
    // route      DELETE api/expert/schedules/:id
    // @access    Private
    async cancelSchedule(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                const scheduleId = req.params.id;
                const response = await this.appointmentUsecase.cancelSchedule(scheduleId, expertData._id || '');
                res.status(response.status).json({
                    success: response.success,
                    message: response.message,
                });
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      fetch slots of experts in Appointment
    // route      POST api/user/getExpertSlots
    // @access    Private
    async getExpertSlots(req: Req, res: Res, next: Next) {
        try {
            const expertId = req.params.expertId;
            const page = parseInt(req.params.page as string) || 1;
            const limit = parseInt(req.params.limit as string) || 4;
            const expertSlots = await this.appointmentUsecase.getExpertSlots(expertId, page, limit);
            if (expertSlots) {
                return res.status(expertSlots.status).json({
                    success: expertSlots.success,
                    data: expertSlots.data,
                    total: expertSlots.total,
                    message: expertSlots.message,
                });
            }
        } catch (err) {
            next(err);
        }
    }

    //   @desc    Cancel appointment
    //   @route   PATCH /api/user/cancelAppointment/:id
    //   @access  Private
    async cancelAppointment(req: Req, res: Res, next: Next) {
        try {
            const appointmentId = req.params.id;
            const response = await this.appointmentUsecase.cancelAppointment(appointmentId);
            if (response) {
                return res.status(response.status).json({
                    success: response.success,
                    message: response.message,
                });
            }
            throw ErrorResponse.internalServerError("appointment cancellation failed");
        } catch (err) {
            next(err);
        }
    }

    // @desc    Pay for the service
    // @route   POST /api/user/payment
    // @access  Private
    async payment(req: Req, res: Res, next: Next) {
        try {
            console.log('payment entered')
            const { amount, appointmentId, userId, userName } = req.body
            console.log('in payment amount : ', amount, 'appointmentId : ', appointmentId, 'userId : ', userId, "userName: ", userName)
            const payment = await this.appointmentUsecase.createPayment(amount, appointmentId, userId, userName)
            console.log('payment in payment : ', payment)
            res.status(payment.status).json({
                data: payment.data,
            })
        } catch (err) {
            next(err)
        }
    }

    // @desc    webhook integration
    // @route   POST /api/user/webhook
    // @access  Private
    async webhook(req: Req, res: Res, next: Next) {
        try {
            console.log('inside webhook appointmentAdapter')
            const event = req.body;
            switch (event.type) {
                case "checkout.session.completed":
                    const session = event.data.object;
                    const metadata = session.metadata;
                    console.log('metadata in webhook : ', metadata)
                    const appointmentId = metadata.appointmentId;
                    const userId = metadata.userId;
                    const userName = metadata.userName;
                    const amount = metadata.amount;
                    const transactionId = event.data.object.payment_intent;
                    await this.appointmentUsecase.paymentConfirmation({
                        transactionId,
                        appointmentId,
                        userId,
                        userName,
                        amount,
                    });
                    break;
                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }
            res.status(200).json({ received: true });
        } catch (error) {
            next(error);
        }
    }

    // @desc      Get user appointments
    // route      GET api/user/getUserAppointments
    // @access    Private
    async getUserAppointments(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'mobile' in req.user) {
                const userData = req.user as IUser;
                const userId = userData._id;
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 4;
                const appointments = await this.appointmentUsecase.getUserAppointments(userId || '', page, limit);
                return res.status(appointments.status).json({
                    success: appointments.success,
                    data: appointments.data,
                    total: appointments.total,
                    message: appointments.message,
                });
            } else {
                throw ErrorResponse.notFound('User not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get appointments data for expert
    // route      GET api/expert/getAppointmentsData
    // @access    Private
    async getAppointmentsData(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                const expertId = expertData._id;
                const page = parseInt(req.params.page as string) || 1;
                const limit = parseInt(req.params.limit as string) || 4;
                const appointments = await this.appointmentUsecase.getAppointmentsData(expertId || '', page, limit);
                return res.status(appointments.status).json({
                    success: appointments.success,
                    data: appointments.data,
                    total: appointments.total,
                    message: appointments.message,
                });
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get appointments data for expert wallet transaction history
    // route      GET api/expert/getWalletData
    // @access    Private
    async getWalletData(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                const expertId = expertData._id;
                const page = parseInt(req.params.page as string) || 1;
                const limit = parseInt(req.params.limit as string) || 4;
                const appointments = await this.appointmentUsecase.getWalletData(expertId || '', page, limit);
                return res.status(appointments.status).json({
                    success: appointments.success,
                    data: appointments.data,
                    total: appointments.total,
                    message: appointments.message,
                });
            } else {
                throw ErrorResponse.notFound('Expert not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc    Pay for the service using wallet
    // @route   POST /api/user/walletPayment
    // @access  Private
    async walletPayment(req: Req, res: Res, next: Next) {
        try {
            console.log('walletPayment entered')
            const { amount, appointmentId, userId, userName } = req.body
            console.log('in walletPayment amount : ', amount, 'appointmentId : ', appointmentId, 'userId : ', userId, "userName: ", userName)
            const walletPayment = await this.appointmentUsecase.processWalletPayment({ amount, appointmentId, userId, userName })
            console.log('walletPayment after processWalletPayment : ', walletPayment)
            res.status(walletPayment.status).json({
                success: walletPayment.success,
                message: walletPayment.message,
            })
        } catch (err) {
            next(err)
        }
    }

    // @desc    Get all appointments data for admin
    // @route   GET /api/admin/appointmentData
    // @access  Private
    async allAppointmentsData(req: Req, res: Res, next: Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const appointments = await this.appointmentUsecase.allAppointmentsData(page, limit);
            return res.status(appointments.status).json({
                success: appointments.success,
                data: appointments.data,
                total: appointments.total,
                message: appointments.message,
            });
        } catch (err) {
            next(err)
        }
    }

    // @desc    Update appointment status
    // @route   PATCH /api/user/updateAppointmentStatus/:id
    // @access  Private
    async updateAppointmentStatus(req: Req, res: Res, next: Next) {
        try {
            const appointmentId = req.params.id;
            const status = req.body.status;
            const response = await this.appointmentUsecase.updateAppointmentStatus(appointmentId, status);
            if (response) {
                return res.status(response.status).json({
                    success: response.success,
                    message: response.message,
                });
            }
            throw ErrorResponse.internalServerError("appointment status update failed");
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Appointments Count
    // route      GET api/user/getAppointmentsCount
    // @access    Private
    async getAppointmentsCount(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'mobile' in req.user) {
                const userData = req.user as IUser;
                const userId = userData._id;
                const appointments = await this.appointmentUsecase.getAppointmentsCount(userId || '');
                return res.status(appointments.status).json({
                    success: appointments.success,
                    data: appointments.data,
                    message: appointments.message,
                });
            } else {
                throw ErrorResponse.notFound('User not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Single Appointments Data
    // route      GET api/user/getSingleAppointment
    // @access    Private
    async getSingleAppointment(req: Req, res: Res, next: Next) {
        try {
            const appointmentId = req.params.appointmentId;
            const appointments = await this.appointmentUsecase.getSingleAppointment(appointmentId);
            return res.status(appointments.status).json({
                success: appointments.success,
                data: appointments.data,
                message: appointments.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      User Review the Session
    // route      POST api/user/review
    // @access    Private
    async review(req: Req, res: Res, next: Next) {
        try {
            const response = await this.appointmentUsecase.review(req.body);
            return res.status(response.status).json({
                success: response.success,
                message: response.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Reviews for expert
    // route      GET api/expert/expertGetReview
    // @access    Private
    async expertGetReview(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'category' in req.user) {
                const expertData = req.user as IExpert;
                const expertId = expertData._id;
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 6;
                const response = await this.appointmentUsecase.expertGetReview(expertId || '', page, limit);
                console.log('response of review: ', response)
                return res.status(response.status).json({
                    success: response.success,
                    data: response.data,
                    total: response.total,
                    message: response.message,
                });
            } else {
                throw ErrorResponse.notFound('User not found');
            }
        } catch (err) {
            next(err);
        }
    }

    // @desc      User Report Expert for misconduct
    // route      POST api/user/report
    // @access    Private
    async report(req: Req, res: Res, next: Next) {
        try {
            const response = await this.appointmentUsecase.report(req.body);
            return res.status(response.status).json({
                success: response.success,
                message: response.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get Report of an expert for admin
    // route      GET api/admin/report
    // @access    Private
    async reportByExpertId(req: Req, res: Res, next: Next) {
        try {
            const expertId = req.params.expertId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;
            const response = await this.appointmentUsecase.reportByExpertId(expertId || '', page, limit);
            return res.status(response.status).json({
                success: response.success,
                data: response.data,
                total: response.total,
                message: response.message,
            });
        } catch (err) {
            next(err);
        }
    }

    // @desc      Get appointments data for user wallet transaction history
    // route      GET api/user/getUserWalletData
    // @access    Private
    async getUserWalletData(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'mobile' in req.user) {
                const userData = req.user as IUser;
                const userId = userData._id;
                const page = parseInt(req.params.page as string) || 1;
                const limit = parseInt(req.params.limit as string) || 4;
                const appointments = await this.appointmentUsecase.getUserWalletData(userId || '', page, limit);
                return res.status(appointments.status).json({
                    success: appointments.success,
                    data: appointments.data,
                    total: appointments.total,
                    message: appointments.message,
                });
            } else {
                throw ErrorResponse.notFound('User not found');
            }
        } catch (err) {
            next(err);
        }
    }
}
