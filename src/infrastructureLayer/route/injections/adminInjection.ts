// backend\src\infrastructureLayer\route\injections\adminInjection.ts

import { AdminAdapter } from '../../../controllerLayer/adminAdapter'
import { AdminUsecase } from '../../../usecaseLayer/usecase/adminUsecase'
import AdminModel from '../../database/model/adminModel'
import { AdminRepository } from '../../database/repository/adminRepository'
import Encrypt from '../../services/bcrypt'
import JwtPassword from '../../services/jwt'
import RequestValidator from '../../services/validateRepository'

const adminRepository = new AdminRepository(AdminModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const requestValidator = new RequestValidator()
const adminUsecase = new AdminUsecase(
    adminRepository,
    bcrypt,
    jwt,
    requestValidator
)
const adminAdapter = new AdminAdapter(adminUsecase)
export { adminAdapter }