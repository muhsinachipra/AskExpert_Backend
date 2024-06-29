// backend\src\infrastructureLayer\database\repository\appointment\addSchedule.ts

import { IAppointment } from '../../../../domainLayer/appointment'
import AppointmentModel from '../../model/appointmentModel'

export const addSchedule = async (
    newAppointment: Partial<IAppointment>,
    appointmentModel: typeof AppointmentModel
): Promise<IAppointment> => {
    try {
        const createdAppointment = new appointmentModel(newAppointment);
        await createdAppointment.save();
        console.log('createdAppointment : ',createdAppointment)
        return createdAppointment;
    }
    catch (error) {
        throw error
    }
}
