// backend\src\infrastructureLayer\route\injections\appointmentInjection.ts

import RequestValidator from '../../services/validateRepository'
import AppointmentModel from '../../database/model/appointmentModel'
import { AppointmentRepository } from '../../database/repository/appointmentRepository'
import { AppointmentUsecase } from '../../../usecaseLayer/usecase/appointmentUsecase'
import { AppointmentController } from '../../../controllerLayer/AppointmentController'
import StripeService from '../../services/stripe'
import ExpertModel from '../../database/model/expertModel'
import { ExpertRepository } from '../../database/repository/expertRepository'
import { UserRepository } from '../../database/repository/userRepository'
import UserModel from '../../database/model/userModel'
import { ReviewRepository } from '../../database/repository/reviewRepository'
import ReviewModel from '../../database/model/reviewModel'
import ReportModel from '../../database/model/reportModel'

const appointmentRepository = new AppointmentRepository(AppointmentModel)
const reviewRepository = new ReviewRepository(ReviewModel, ReportModel)
const expertRepository = new ExpertRepository(ExpertModel)
const userRepository = new UserRepository(UserModel)
const requestValidator = new RequestValidator()
const stripe = new StripeService()
const appointmentUsecase = new AppointmentUsecase(
    appointmentRepository,
    reviewRepository,
    expertRepository,
    userRepository,
    requestValidator,
    stripe
)
const appointmentController = new AppointmentController(appointmentUsecase)
export { appointmentController }
