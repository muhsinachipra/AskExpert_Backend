// backend\src\infrastructureLayer\route\injections\adminInjection.ts

import { AdminAdapter } from '../../../controllerLayer/adminAdapter'
import { AdminUsecase } from '../../../usecaseLayer/usecase/adminUsecase'
import AdminModel from '../../database/model/adminModel'
import ExpertModel from '../../database/model/expertModel'
import CategoryModel from '../../database/model/categoryModel'
import { AdminRepository } from '../../database/repository/adminRepository'
import { ExpertRepository } from '../../database/repository/expertRepository'
import { UserRepository } from '../../database/repository/userRepository'
import { CategoryRepository } from '../../database/repository/categoryRepository'
import Encrypt from '../../services/bcrypt'
import JwtPassword from '../../services/jwt'
import Nodemailer from '../../services/nodemailer'
import RequestValidator from '../../services/validateRepository'
import UserModel from '../../database/model/userModel'
import AppointmentModel from '../../database/model/appointmentModel'
import { AppointmentRepository } from '../../database/repository/appointmentRepository'
import { ReviewRepository } from '../../database/repository/reviewRepository'
import ReviewModel from '../../database/model/reviewModel'
import ReportModel from '../../database/model/reportModel'

const adminRepository = new AdminRepository(AdminModel)
const expertRepository = new ExpertRepository(ExpertModel)
const userRepository = new UserRepository(UserModel)
const categoryRepository = new CategoryRepository(CategoryModel)
const appointmentRepository = new AppointmentRepository(AppointmentModel)
const reviewRepository = new ReviewRepository(ReviewModel, ReportModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const requestValidator = new RequestValidator()
const nodemailer = new Nodemailer()
const adminUsecase = new AdminUsecase(
    adminRepository,
    expertRepository,
    userRepository,
    categoryRepository,
    appointmentRepository,
    reviewRepository,
    bcrypt,
    jwt,
    nodemailer,
    requestValidator
)
const adminAdapter = new AdminAdapter(adminUsecase)
export { adminAdapter }
