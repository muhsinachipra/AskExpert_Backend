// backend\src\infrastructureLayer\database\repository\appointmentRepository.ts

import { IAppointment } from "../../../domainLayer/appointment";
import { addSchedule } from "./appointment/addSchedule";
import AppointmentModel from "../model/appointmentModel";
import { IAppointmentRepository } from "../../../usecaseLayer/interface/repository/IAppointmentRepository";
import { IExpert } from "../../../domainLayer/expert";
import { findAppointmentByTimeAndExpert } from "./appointment/findAppointmentByTimeAndExpert";
import { IResponse } from "../../../usecaseLayer/interface/services/IResponse";
import { getSchedules } from "./appointment/getSchedules";
import { payment } from "./appointment/payment";
import { findAppointmentByTimeRangeAndExpert } from "./appointment/findAppointmentByTimeRangeAndExpert";

export class AppointmentRepository implements IAppointmentRepository {

    constructor(private readonly appointmentModel: typeof AppointmentModel) { }

    async findAppointmentByTimeAndExpert(date: string, startTime: string, expertId: string): Promise<IAppointment | null> {
        return findAppointmentByTimeAndExpert(date, startTime, expertId, this.appointmentModel)
    }

    async findAppointmentByTimeRangeAndExpert(date: string, startTime: string, endTime: string, expertId: string): Promise<IAppointment | null> {
        return findAppointmentByTimeRangeAndExpert(date, startTime, endTime, expertId, this.appointmentModel)
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

    async payment(appointmentId: string, transactionId: string, userId: string, userName: string): Promise<string> {
        return payment(appointmentId, transactionId, userId, userName, this.appointmentModel)
    }

    async getExpertId(appointmentId: string): Promise<string> {
        try {
            const appointment = await this.appointmentModel.findOne({ _id: appointmentId });
            if (appointment) {
                return appointment.expertId.toString();
            }
            return "";
        } catch (error) {
            console.error('Error getting expertId:', error);
            return "";
        }
    }

    async getUserAppointments(userId: string): Promise<IAppointment[]> {
        try {
            const appointments = await this.appointmentModel.find({
                userId,
                appointmentStatus: { $in: ['booked', 'cancelled', 'completed'] }
            }).sort({ date: 1 });
            return appointments;
        } catch (error) {
            console.error('Error getting user appointments:', error);
            return [];
        }
    }

    async getAppointmentsData(expertId: string): Promise<IAppointment[]> {
        try {
            const appointments = await this.appointmentModel.find({ expertId, appointmentStatus: 'booked' });
            return appointments;
        } catch (error) {
            console.error('Error getting expert appointments:', error);
            return [];
        }
    }

    async getWalletData(expertId: string): Promise<IAppointment[]> {
        try {
            const appointments = await this.appointmentModel.find({
                expertId,
                appointmentStatus: { $in: ['booked', 'completed'] }
            }).sort({ date: 1 }); // 1 for ascending, -1 for descending
            return appointments;
        } catch (error) {
            console.error('Error getting expert appointments:', error);
            return [];
        }
    }

    async cancelAppointment(appointmentId: string): Promise<void> {
        try {
            const appointment = await this.appointmentModel.findOneAndUpdate(
                { _id: appointmentId },
                {
                    $set: {
                        appointmentStatus: 'cancelled',
                        paymentStatus: 'refunded'
                    }
                },
                { new: true }  // This option returns the modified document rather than the original
            );
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            throw error;
        }
    }

    async getAppointmentById(appointmentId: string): Promise<IAppointment | null> {
        try {
            const appointment = await this.appointmentModel.findOne({ _id: appointmentId });
            if (appointment) {
                return appointment
            }
            return null;
        } catch (error) {
            console.error('Error finding appointment: ', error);
            return null;
        }
    }

    async getAllAppointments(page: number, limit: number): Promise<{ data: IAppointment[], total: number }> {
        try {
            const skip = (page - 1) * limit;
            const appointmentData = await this.appointmentModel.find().skip(skip).limit(limit).sort({ createdAt: 1 });
            const total = await this.appointmentModel.countDocuments();
            return { data: appointmentData, total };
        } catch (error) {
            throw error
        }
    }

    async updateAppointmentStatus(appointmentId: string, status: string): Promise<IAppointment | null> {
        try {
            const appointment = await this.appointmentModel.findOneAndUpdate(
                { _id: appointmentId },
                { appointmentStatus: status },
                { new: true }
            );
            if (appointment) {
                return appointment;
            }
            return null;
        } catch (error) {
            console.error('Error updating appointment status: ', error);
            return null;
        }
    }

    async getAppointmentsCount(userId: string): Promise<number> {
        try {
            const count = await this.appointmentModel.countDocuments({ userId, appointmentStatus: 'booked' });
            return count;
        } catch (error) {
            console.error('Error counting appointments: ', error);
            return 0;
        }
    }
}
