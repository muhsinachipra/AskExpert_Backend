// backend\src\infrastructureLayer\route\injections\appointmentInjection.ts

import RequestValidator from '../../services/validateRepository'
import AppointmentModel from '../../database/model/appointmentModel'
import { AppointmentRepository } from '../../database/repository/appointmentRepository'
import { AppointmentUsecase } from '../../../usecaseLayer/usecase/appointmentUsecase'
import { AppointmentAdapter } from '../../../controllerLayer/AppointmentAdapter'

const appointmentRepository = new AppointmentRepository(AppointmentModel)
const requestValidator = new RequestValidator()
const appointmentUsecase = new AppointmentUsecase(
    appointmentRepository,
    requestValidator
)
const appointmentAdapter = new AppointmentAdapter(appointmentUsecase)
export { appointmentAdapter }
