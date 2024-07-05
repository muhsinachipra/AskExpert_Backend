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
                const schedules = await this.appointmentUsecase.getSchedules(expertId || '');
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
            const expertSlots = await this.appointmentUsecase.getExpertSlots(expertId);
            if (expertSlots) {
                return res.status(expertSlots.status).json({
                    success: expertSlots.success,
                    data: expertSlots.data,
                    message: expertSlots.message,
                });
            }
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
            if (req.user && 'mobile' in req.user) {
                const userData = req.user as IUser;
                const { amount, appointmentId } = req.body
                const payment = await this.appointmentUsecase.createPayment(amount, appointmentId, userData || '')
                res.status(payment.status).json({
                    data: payment.data,
                })
            } else {
                throw new Error('User not found');
            }

        } catch (err) {
            next(err)
        }
    }

    // @desc    webhook integration
    // @route   POST /api/user/webhook
    // @access  Private
    async webhook(req: Req, res: Res, next: Next) {
        try {
            if (req.user && 'mobile' in req.user) {
                const userData = req.user as IUser;
                const event = req.body;
                switch (event.type) {
                    case "checkout.session.completed":
                        const session = event.data.object;
                        const metadata = session.metadata;
                        console.log('metadata in webhook : ', metadata)
                        const appointmentId = metadata.appointmentId;
                        const amount = metadata.amount;
                        const transactionId = event.data.object.payment_intent;
                        await this.appointmentUsecase.paymentConfirmation({
                            transactionId,
                            appointmentId,
                            userData,
                            amount,
                        });
                        break;
                    default:
                        console.log(`Unhandled event type: ${event.type}`);
                }
                res.status(200).json({ received: true });
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            next(error);
        }
    }

}