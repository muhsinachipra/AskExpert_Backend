// backend\src\usecaseLayer\interface\repository\IAppointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment"
import { IExpert } from "../../../domainLayer/expert"
import { IResponse } from "../services/IResponse"

export interface IAppointmentRepository {
    findAppointmentByTimeAndExpert(time: string, expertId: string): Promise<IAppointment | null>
    addSchedule(newAppointment: Partial<IAppointment>): Promise<IAppointment>
    getSchedules(expertId: string): Promise<IAppointment[]>
    deleteSchedule(scheduleId: string, expertId: string): Promise<boolean>
}