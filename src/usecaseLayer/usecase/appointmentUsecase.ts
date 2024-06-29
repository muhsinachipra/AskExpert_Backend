// backend\src\usecaseLayer\usecase\appointmentUsecase.ts

import { IExpert } from '../../domainLayer/expert'
import { IAppointmentRepository } from '../interface/repository/IAppointmentRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import { addSchedule } from './appointment/addSchedule'
import { getSchedules } from './appointment/getSchedules'

export class AppointmentUsecase {
    private readonly appointmentRepository: IAppointmentRepository
    private readonly requestValidator: IRequestValidator

    constructor(
        appointmentRepository: IAppointmentRepository,
        requestValidator: IRequestValidator
    ) {
        this.appointmentRepository = appointmentRepository
        this.requestValidator = requestValidator
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

}