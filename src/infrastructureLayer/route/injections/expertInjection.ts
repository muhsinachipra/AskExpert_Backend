// backend\src\infrastructureLayer\route\injections\expertInjection.ts

import { ExpertAdapter } from '../../../controllerLayer/expertAdapter'
import { ExpertUsecase } from '../../../usecaseLayer/usecase/expertUsecase'
import ExpertModel from '../../database/model/expertModel'
import { ExpertRepository } from '../../database/repository/expertRepository'
import Encrypt from '../../services/bcrypt'
import JwtPassword from '../../services/jwt'
import Nodemailer from '../../services/nodemailer'
import RequestValidator from '../../services/validateRepository'

const expertRepository = new ExpertRepository(ExpertModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const requestValidator = new RequestValidator()
const nodemailer = new Nodemailer()
const expertUsecase = new ExpertUsecase(
    expertRepository,
    bcrypt,
    jwt,
    nodemailer,
    requestValidator
)
const expertAdapter = new ExpertAdapter(expertUsecase)
export { expertAdapter }