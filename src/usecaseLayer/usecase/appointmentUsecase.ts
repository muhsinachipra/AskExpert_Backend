// backend\src\usecaseLayer\usecase\appointmentUsecase.ts

import { IExpert } from '../../domainLayer/expert'
import { IReview } from '../../domainLayer/review'
import { Req } from '../../infrastructureLayer/types/expressTypes'
import { IAppointmentRepository } from '../interface/repository/IAppointmentRepository'
import { IExpertRepository } from '../interface/repository/IExpertRepository'
import { IUserRepository } from '../interface/repository/IUserRepository'
import { IRequestValidator } from '../interface/repository/IValidateRepository'
import IStripe from '../interface/services/IStripe'
import { addSchedule } from './appointment/addSchedule'
import { cancelSchedule } from './appointment/cancelSchedule'
import { createPayment } from './appointment/createPayment'
import { getExpertSlots } from './appointment/getExpertSlots'
import { getSchedules } from './appointment/getSchedules'
import { cancelAppointment } from './appointment/cancelAppointment'
import { paymentConfirmation } from './appointment/paymentConfirmation'
import { processWalletPayment } from './appointment/processWalletPayment'
import { allAppointmentsData } from './appointment/allAppointmentsData'
import ErrorResponse from '../handler/errorResponse'
import { IReviewRepository } from '../interface/repository/IReviewRepository'
import { IReport } from '../../domainLayer/report'

export class AppointmentUsecase {
    private readonly appointmentRepository: IAppointmentRepository
    private readonly reviewRepository: IReviewRepository
    private readonly expertRepository: IExpertRepository
    private readonly userRepository: IUserRepository
    private readonly requestValidator: IRequestValidator
    private readonly stripe: IStripe
    constructor(
        appointmentRepository: IAppointmentRepository,
        reviewRepository: IReviewRepository,
        expertRepository: IExpertRepository,
        userRepository: IUserRepository,
        requestValidator: IRequestValidator,
        stripe: IStripe
    ) {
        this.appointmentRepository = appointmentRepository
        this.reviewRepository = reviewRepository
        this.expertRepository = expertRepository
        this.userRepository = userRepository
        this.requestValidator = requestValidator
        this.stripe = stripe
    }

    // async addSchedule(scheduleData: { date: string, startTime: string, rrule: string  }, expertData: IExpert) {
    async addSchedule(scheduleData: Record<string, string>, expertData: IExpert) {
        return addSchedule(
            scheduleData,
            expertData,
            this.requestValidator,
            this.appointmentRepository,
        );
    }

    async getSchedules(expertId: string, page: number, limit: number) {
        return getSchedules(expertId, page, limit, this.appointmentRepository);
    }

    async cancelSchedule(scheduleId: string, expertId: string) {
        return cancelSchedule(scheduleId, expertId, this.appointmentRepository);
    }

    async getExpertSlots(expertId: string, page: number, limit: number) {
        return getExpertSlots(
            expertId,
            page,
            limit,
            this.requestValidator,
            this.appointmentRepository,
        );
    }

    async createPayment(amount: number, appointmentId: string, userId: string, userName: string) {
        return createPayment(this.stripe, amount, appointmentId, userId, userName, this.requestValidator,)
    }

    async paymentConfirmation({ transactionId, appointmentId, userId, userName, amount }: { transactionId: string, appointmentId: string, userId: string, userName: string, amount: number }) {
        return paymentConfirmation(
            this.appointmentRepository, this.expertRepository, transactionId, appointmentId, userId, userName, amount
        )
    }

    async getUserAppointments(userId: string, page: number, limit: number) {
        const { data, total } = await this.appointmentRepository.getUserAppointments(
            userId,
            page,
            limit,
        );
        return {
            success: true,
            data,
            total,
            message: 'User Appointment data retrieved successfully',
            status: 200,
        };
    }

    async getAppointmentsData(expertId: string, page: number, limit: number) {
        try {
            const { data, total } = await this.appointmentRepository.getAppointmentsData(expertId, page, limit);
            return {
                success: true,
                data,
                total,
                message: 'Expert Appointment data retrieved successfully',
                status: 200,
            };
        } catch (error) {
            throw error
        }
    }

    async getWalletData(expertId: string, page: number, limit: number) {
        try {
            const { data, total } = await this.appointmentRepository.getWalletData(expertId, page, limit);
            return {
                success: true,
                data,
                total,
                message: 'Expert Appointment data retrieved successfully',
                status: 200,
            };
        } catch (error) {
            throw error
        }

    }

    async cancelAppointment(appointmentId: string) {
        try {
            return await cancelAppointment(
                this.requestValidator,
                this.appointmentRepository,
                this.userRepository,
                appointmentId,
            );
        } catch (error) {
            console.error('Error cancelling appointment: ', error);
            throw error;
        }
    }

    async processWalletPayment({ amount, appointmentId, userId, userName }:
        { appointmentId: string, userId: string, userName: string, amount: number }) {
        return processWalletPayment(
            this.requestValidator, this.userRepository, this.expertRepository, this.appointmentRepository, appointmentId, userId, userName, amount
        )
    }

    async allAppointmentsData(page: number, limit: number) {
        return allAppointmentsData(
            page, limit, this.appointmentRepository
        );
    }

    async updateAppointmentStatus(appointmentId: string, status: string) {
        try {
            const appointment = await this.appointmentRepository.updateAppointmentStatus(appointmentId, status);
            if (appointment) {
                return {
                    success: true,
                    message: 'Appointment status updated successfully',
                    status: 200,
                };
            }
            throw ErrorResponse.internalServerError('Failed to update appointment status')
        } catch (error) {
            console.error('Error updating appointment status: ', error);
            throw error;
        }
    }

    async getAppointmentsCount(userId: string) {
        const data = await this.appointmentRepository.getAppointmentsCount(userId);
        return {
            success: true,
            data,
            message: 'User Appointment data retrieved successfully',
            status: 200,
        };
    }

    async getSingleAppointment(appointmentId: string) {
        const data = await this.appointmentRepository.getSingleAppointment(appointmentId);
        return {
            success: true,
            data,
            message: 'Appointment data retrieved successfully',
            status: 200,
        };
    }

    async review({ userId, expertId, rating, feedback, appointmentId }: IReview) {
        try {
            await this.reviewRepository.review({ userId, expertId, rating, feedback, appointmentId });
            return {
                success: true,
                message: 'Review submited successfully',
                status: 200,
            };
        } catch (error) {
            console.error('Error submitting review: ', error);
            throw error;
        }
    }


    async expertGetReview(expertId: string, page: number, limit: number) {
        const { data, total } = await this.reviewRepository.expertGetReview(expertId, page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Appointment data retrieved successfully',
            status: 200,
        };
    }

    async report({ userId, expertId, reason }: IReport) {
        try {
            await this.reviewRepository.report({ userId, expertId, reason });
            return {
                success: true,
                message: 'Report submited successfully',
                status: 200,
            };
        } catch (error) {
            console.error('Error submitting report: ', error);
            throw error;
        }
    }

    async reportByExpertId(expertId: string, page: number, limit: number) {
        const { data, total } = await this.reviewRepository.reportByExpertId(expertId, page, limit);
        return {
            success: true,
            data,
            total,
            message: 'Report data retrieved successfully',
            status: 200,
        };
    }
}
