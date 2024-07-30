// backend\src\usecaseLayer\usecase\appointment\processWalletPayment.ts

import ErrorResponse from "../../handler/errorResponse"
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository"
import { IExpertRepository } from "../../interface/repository/IExpertRepository"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IRequestValidator } from "../../interface/repository/IValidateRepository"
import { IResponse } from "../../interface/services/IResponse"
import crypto from 'crypto'

export const processWalletPayment = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    expertRepository: IExpertRepository,
    appointmentRepository: IAppointmentRepository,
    appointmentId: string,
    userId: string,
    userName: string,
    amount: number,
): Promise<IResponse> => {

    try {
        const validation = requestValidator.validateRequiredFields(
            { appointmentId, userId, userName, amount },
            ['appointmentId', 'userId', 'userName', 'amount']
        )
        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string)
        }

        function generateRandomString(prefix = 'wa_', length = 24) {
            const randomBytes = crypto.randomBytes(length / 2).toString('hex');
            return prefix + randomBytes;
        }
        const transactionId = generateRandomString()

        await userRepository.deductFromWallet(userId, amount)
        const expertId = await appointmentRepository.getExpertId(appointmentId)
        await appointmentRepository.payment(appointmentId, transactionId, userId, userName)
        await expertRepository.amountToWallet(expertId, amount)
        return {
            status: 200,
            success: true,
            message: 'Payment successful',
        };
    } catch (err) {
        console.log(err)
        throw err
    }
}