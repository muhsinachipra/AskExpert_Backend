// backend\src\infrastructureLayer\route\injections\userInjection.ts

import { UserAdapter } from '../../../controllerLayer/userAdapter'
import { UserUsecase } from '../../../usecaseLayer/usecase/userUsecase'
import CategoryModel from '../../database/model/categoryModel'
import ExpertModel from '../../database/model/expertModel'
import UserModel from '../../database/model/userModel'
import { CategoryRepository } from '../../database/repository/categoryRepository'
import { ExpertRepository } from '../../database/repository/expertRepository'
import { UserRepository } from '../../database/repository/userRepository'
import Encrypt from '../../services/bcrypt'
import JwtPassword from '../../services/jwt'
import Nodemailer from '../../services/nodemailer'
import RequestValidator from '../../services/validateRepository'

const userRepository = new UserRepository(UserModel)
const expertRepository = new ExpertRepository(ExpertModel)
const categoryRepository = new CategoryRepository(CategoryModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const requestValidator = new RequestValidator()
const nodemailer = new Nodemailer()
const userUsecase = new UserUsecase(
    userRepository,
    expertRepository,
    categoryRepository,
    bcrypt,
    jwt,
    nodemailer,
    requestValidator
)
const userAdapter = new UserAdapter(userUsecase)
export { userAdapter }