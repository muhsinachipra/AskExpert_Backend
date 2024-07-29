// backend\src\infrastructureLayer\route\injections\appointmentInjection.ts

import RequestValidator from '../../services/validateRepository'
import AppointmentModel from '../../database/model/appointmentModel'
import { AppointmentRepository } from '../../database/repository/appointmentRepository'
import { AppointmentUsecase } from '../../../usecaseLayer/usecase/appointmentUsecase'
import { AppointmentAdapter } from '../../../controllerLayer/AppointmentAdapter'
import StripeService from '../../services/stripe'
import ExpertModel from '../../database/model/expertModel'
import { ExpertRepository } from '../../database/repository/expertRepository'
import { UserRepository } from '../../database/repository/userRepository'
import UserModel from '../../database/model/userModel'

const appointmentRepository = new AppointmentRepository(AppointmentModel)
const expertRepository = new ExpertRepository(ExpertModel)
const userRepository = new UserRepository(UserModel)
const requestValidator = new RequestValidator()
const stripe = new StripeService()
const appointmentUsecase = new AppointmentUsecase(
    appointmentRepository,
    expertRepository,
    userRepository,
    requestValidator,
    stripe
)
const appointmentAdapter = new AppointmentAdapter(appointmentUsecase)
export { appointmentAdapter }
