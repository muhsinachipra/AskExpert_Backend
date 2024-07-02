// backend\src\infrastructureLayer\database\repository\appointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment";
import { addSchedule } from "./appointment/addSchedule";
import AppointmentModel from "../model/appointmentModel";
import { IAppointmentRepository } from "../../../usecaseLayer/interface/repository/IAppointmentRepository";
import { IExpert } from "../../../domainLayer/expert";
import { findAppointmentByTimeAndExpert } from "./appointment/findAppointmentByTimeAndExpert";
import { IResponse } from "../../../usecaseLayer/interface/services/IResponse";
import { getSchedules } from "./appointment/getSchedules";

export class AppointmentRepository implements IAppointmentRepository {

    constructor(private readonly appointmentModel: typeof AppointmentModel) { }

    async findAppointmentByTimeAndExpert(time: string, expertId: string): Promise<IAppointment | null> {
        return findAppointmentByTimeAndExpert(time, expertId, this.appointmentModel)
    }

    async addSchedule(newAppointment: Partial<IAppointment>): Promise<IAppointment> {
        return addSchedule(newAppointment, this.appointmentModel)
    }

    async getSchedules(expertId: string): Promise<IAppointment[]> {
        return getSchedules(expertId, this.appointmentModel);
    }

    async deleteSchedule(scheduleId: string, expertId: string): Promise<boolean> {
        try {
            const appointment = await this.appointmentModel.findOne({ _id: scheduleId, expertId });
            if (appointment && appointment.paymentStatus === 'pending') {
                const result = await this.appointmentModel.deleteOne({ _id: scheduleId, expertId });
                return result.deletedCount === 1;
            }
            return false;
        } catch (error) {
            console.error('Error deleting schedule:', error);
            return false;
        }
    }

}