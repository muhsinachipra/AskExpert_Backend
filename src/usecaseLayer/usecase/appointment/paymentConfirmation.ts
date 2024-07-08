// backend\src\usecaseLayer\usecase\appointment\paymentConfirmation.ts

import { IUser } from "../../../domainLayer/user"
import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository"
import { IExpertRepository } from "../../interface/repository/IExpertRepository"

export const paymentConfirmation = async (
    appointmentRepository: IAppointmentRepository,
    expertRepository: IExpertRepository,
    transactionId: string,
    appointmentId: string,
    userId: string,
    userName: string,
    amount: number,
) => {
    try {
        console.log('inside paymentConfirmation webhook logic')
        const expertId = await appointmentRepository.getExpertId(appointmentId)
        await appointmentRepository.payment(appointmentId, transactionId, userId, userName)
        await expertRepository.amountToWallet(expertId, amount)
    } catch (err) {
        console.log(err)
        throw err
    }
}