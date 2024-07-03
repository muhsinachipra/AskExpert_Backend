// backend\src\usecaseLayer\usecase\appointment\paymentConfirmation.ts

import { IAppointmentRepository } from "../../interface/repository/IAppointmentRepository"
import { IUserRepository } from "../../interface/repository/IUserRepository"

export const paymentConfirmation = async (
    appointmentRepository: IAppointmentRepository,
    userRepository: IUserRepository,
    transactionId: string,
    bookingId: string,
    workerId: string,
    amount: number,
) => {
    try {
        await appointmentRepository.payment(bookingId, transactionId)
        const workerAmount = amount
        await userRepository.amountToWallet(workerId, workerAmount)
    } catch (err) {
        console.log(err)
        throw err
    }
}