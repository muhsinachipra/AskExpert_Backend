// backend\src\controllerLayer\AppointmentAdapter.ts

import { IExpert } from '../domainLayer/expert'
import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
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
                throw new Error('Expert not found');
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
                throw new Error('Expert not found');
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
                throw new Error('Expert not found');
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

}