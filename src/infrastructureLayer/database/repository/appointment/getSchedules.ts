// backend\src\infrastructureLayer\database\repository\appointment\getSchedules.ts

import mongoose from "mongoose";
import AppointmentModel from "../../model/appointmentModel";

export const getSchedules = async (expertId: string, appointmentModel: typeof AppointmentModel) => {
    try {

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
            }
        ]);
        console.log('appointmentData: ', appointmentData);
        return appointmentData;
    } catch (error) {
        throw error;
    }
};





// // backend\src\infrastructureLayer\database\repository\appointment\getSchedules.ts

// import AppointmentModel from "../../model/appointmentModel";

// export const getSchedules = async (expertId: string, appointmentModel: typeof AppointmentModel) => {
//     try {
//         const appointmentData = await appointmentModel.find({
//             expertId,
//             appointmentStatus: 'pending',
//         }).sort({ createdAt: -1 });
//         return appointmentData
//     } catch (error) {
//         throw error;
//     }
// };