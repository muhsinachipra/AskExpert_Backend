// backend\src\usecaseLayer\usecase\appointmentUsecase.ts

import { IExpert } from '../../domainLayer/expert'
import { IUser } from '../../domainLayer/user'
import { Req } from '../../infrastructureLayer/types/expressTypes'
import { IAppointmentRepository } from '../interface/repository/IAppointmentRepository'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IStripe from '../interface/services/IStripe'
import { addSchedule } from './appointment/addSchedule'
import { cancelSchedule } from './appointment/cancelSchedule'
import { createPayment } from './appointment/createPayment'
import { getExpertSlots } from './appointment/getExpertSlots'
import { getSchedules } from './appointment/getSchedules'
import { paymentConfirmation } from './appointment/paymentConfirmation'

export class AppointmentUsecase {
    private readonly appointmentRepository: IAppointmentRepository
    private readonly expertRepository: IExpertRepository
    private readonly requestValidator: IRequestValidator
    private readonly stripe: IStripe
    constructor(
        appointmentRepository: IAppointmentRepository,
        expertRepository: IExpertRepository,
        requestValidator: IRequestValidator,
        stripe: IStripe
    ) {
        this.appointmentRepository = appointmentRepository
        this.expertRepository = expertRepository
        this.requestValidator = requestValidator
        this.stripe = stripe
    }

    async addSchedule(scheduleData: { date: string, time: string }, expertData: IExpert) {
        return addSchedule(
            scheduleData,
            expertData,
            this.requestValidator,
            this.appointmentRepository,
        );
    }

    async getSchedules(expertId: string) {
        return getSchedules(expertId, this.appointmentRepository);
    }

    async cancelSchedule(scheduleId: string, expertId: string) {
        return cancelSchedule(scheduleId, expertId, this.appointmentRepository);
    }

    async getExpertSlots(expertId: string) {
        return getExpertSlots(
            expertId,
            this.requestValidator,
            this.appointmentRepository,
        );
    }

    async createPayment(amount: number, appointmentId: string, userId: string) {
        return createPayment(this.stripe, amount, appointmentId, userId, this.requestValidator,)
    }

    async paymentConfirmation({ transactionId, appointmentId, userId, amount }: { transactionId: string, appointmentId: string, userId: string, amount: number }) {
        return paymentConfirmation(
            this.appointmentRepository, this.expertRepository, transactionId, appointmentId, userId, amount
        )
    }

    async getUserAppointments(userId: string) {
        const data = await this.appointmentRepository.getUserAppointments(userId);
        return {
            success: true,
            data,
            message: 'User Appointment data retrieved successfully',
            status: 200,
        };
    }

}