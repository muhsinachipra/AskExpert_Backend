// backend\src\infrastructureLayer\database\repository\appointment\getSchedules.ts

import mongoose from "mongoose";
import AppointmentModel from "../../model/appointmentModel";

export const getSchedules = async (expertId: string, page: number, limit: number, appointmentModel: typeof AppointmentModel) => {
    try {

        const skip = (page - 1) * limit;

        const now = new Date();
        console.log('UTC time:', now);
        const localTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
        console.log('Local time:', localTime);

        // filter past appointments
        const appointmentData = await appointmentModel.aggregate([
            {
                $addFields: {
                    appointmentDateTime: {
                        $dateFromString: {
                            dateString: {
                                $concat: ["$date", "T", "$startTime"]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    expertId: new mongoose.Types.ObjectId(expertId),
                    appointmentStatus: { $in: ['pending', 'cancelled'] },
                    appointmentDateTime: { $gte: localTime }
                }
            },
            {
                $sort: { appointmentDateTime: 1 }
            },
        ]);
        // Paginate the result
        const paginatedData = appointmentData.slice(skip, skip + limit);

        // Get total count of matching documents
        const total = appointmentData.length;

        return { data: paginatedData, total };
    } catch (error) {
        throw error;
    }
};
