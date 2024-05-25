import { UserAdapter } from '../../../controllerLayer/userAdapter'
import { UserUsecase } from '../../../usecaseLayer/usecase/userUsecase'
import UserModel from '../../database/model/userModel'
import { UserRepository } from '../../database/repository/userRepository'
import Encrypt from '../../services/bcrypt'
import JwtPassword from '../../services/jwt'
import Nodemailer from '../../services/nodemailer'
import RequestValidator from '../../services/validateRepository'

const userRepository = new UserRepository(UserModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const requestValidator = new RequestValidator()
const nodemailer = new Nodemailer()
const userUsecase = new UserUsecase(
    userRepository,
    bcrypt,
    jwt,
    nodemailer,
    requestValidator
)
const userAdapter = new UserAdapter(userUsecase)
export { userAdapter }