// backend\src\usecaseLayer\interface\repository\IAppointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment"

export interface IAppointmentRepository {
    findAppointmentByTimeAndExpert(date: string, startTime: string, expertId: string): Promise<IAppointment | null>
    addSchedule(newAppointment: Partial<IAppointment>): Promise<IAppointment>
    getSchedules(expertId: string): Promise<IAppointment[]>
    deleteSchedule(scheduleId: string, expertId: string): Promise<boolean>
    payment(appointmentId: string, transactionId: string, userId: string, userName: string): Promise<string>;
    getExpertId(appointmentId: string): Promise<string>;
    getUserAppointments(userId: string): Promise<IAppointment[]>
    getAppointmentsData(expertId: string): Promise<IAppointment[]>
    getWalletData(expertId: string): Promise<IAppointment[]>
    findAppointmentByTimeRangeAndExpert(date: string, startTime: string, endTime: string, expertId: string): Promise<IAppointment | null>
    cancelAppointment(appointmentId: string): Promise<void>
    getAppointmentById(appointmentId: string): Promise<IAppointment | null>
    getAllAppointments(page: number, limit: number): Promise<{ data: IAppointment[], total: number }>
}