// backend\src\usecaseLayer\interface\repository\IAppointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment"

export interface IAppointmentRepository {
    findAppointmentByTimeAndExpert(date: string, startTime: string, expertId: string): Promise<IAppointment | null>
    addSchedule(newAppointment: Partial<IAppointment>): Promise<IAppointment>
    getSchedules(expertId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    deleteSchedule(scheduleId: string, expertId: string): Promise<boolean>
    payment(appointmentId: string, transactionId: string, userId: string, userName: string): Promise<string>;
    getExpertId(appointmentId: string): Promise<string>;
    getUserAppointments(userId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    getUserAppointmentsHistory(userId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    getAppointmentsData(expertId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    getWalletData(expertId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    findAppointmentByTimeRangeAndExpert(date: string, startTime: string, endTime: string, expertId: string): Promise<IAppointment | null>
    cancelAppointment(appointmentId: string): Promise<void>
    getAppointmentById(appointmentId: string): Promise<IAppointment | null>
    getAllAppointments(page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    updateAppointmentStatus(appointmentId: string, status: string): Promise<IAppointment | null>
    getAppointmentsCount(userId: string): Promise<number>
    getSingleAppointment(appointmentId: string): Promise<IAppointment | null>
    getUserWalletData(userId: string, page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
    getAppointmentStatistics(): Promise<Record<string, number>>
}