// backend\src\usecaseLayer\usecase\appointmentUsecase.ts

import { IExpert } from '../../domainLayer/expert'
import { IUser } from '../../domainLayer/user'
import { IAppointmentRepository } from '../interface/repository/IAppointmentRepository'
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
    private readonly requestValidator: IRequestValidator
    private readonly stripe: IStripe
    constructor(
        appointmentRepository: IAppointmentRepository,
        requestValidator: IRequestValidator,
        stripe: IStripe
    ) {
        this.appointmentRepository = appointmentRepository
        this.requestValidator = requestValidator
        this.stripe = stripe
    }

    async addSchedule(scheduleData: { time: string }, expertData: IExpert) {
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

    async createPayment(amount: number, appointmentId: string, userData: IUser) {
        return createPayment(this.stripe, amount, appointmentId, userData, this.requestValidator,)
    }

    // async paymentConfirmation({ transactionId, appointmentId, userId, amount }: { transactionId: string, appointmentId: string, userId: string, amount: number }) {
    //     return paymentConfirmation(
    //         this.appointmentRepository, this.userRepository, transactionId, appointmentId, userId, amount
    //     )
    // }

}