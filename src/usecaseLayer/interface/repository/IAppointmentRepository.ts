// backend\src\usecaseLayer\interface\repository\IAppointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment"
import { IExpert } from "../../../domainLayer/expert"
import { IResponse } from "../services/IResponse"

export interface IAppointmentRepository {
    findAppointmentByTimeAndExpert(date: string, startTime: string, expertId: string): Promise<IAppointment | null>
    addSchedule(newAppointment: Partial<IAppointment>): Promise<IAppointment>
    getSchedules(expertId: string): Promise<IAppointment[]>
    deleteSchedule(scheduleId: string, expertId: string): Promise<boolean>
    payment(appointmentId: string, transactionId: string, userId: string, userName: string): Promise<string>;
    getExpertId(appointmentId: string): Promise<string>;
    getUserAppointments(userId: string): Promise<IAppointment[]>
    getAppointmentsData(expertId: string): Promise<IAppointment[]>
    // updateAppointment(appointmentId: string, transactionId: string, userId: string, userName: string, amount: number): Promise<IAppointment | null>
}