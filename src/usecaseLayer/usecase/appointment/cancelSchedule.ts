// backend\src\usecaseLayer\usecase\appointment\cancelSchedule.ts

import { IAppointmentRepository } from '../../interface/repository/IAppointmentRepository';

export const cancelSchedule = async (scheduleId: string, expertId: string, appointmentRepository: IAppointmentRepository) => {
    const response = await appointmentRepository.deleteSchedule(scheduleId, expertId);
    return {
        status: response ? 200 : 404,
        success: response ? true : false,
        message: response ? 'Schedule cancelled successfully' : 'Unable to cancel Schedule ',
    };
};
