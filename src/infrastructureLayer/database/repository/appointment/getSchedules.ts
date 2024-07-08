// backend\src\infrastructureLayer\database\repository\appointment\getSchedules.ts

import mongoose from "mongoose";
import AppointmentModel from "../../model/appointmentModel";

export const getSchedules = async (expertId: string, appointmentModel: typeof AppointmentModel) => {
    try {
        const now = new Date();

        const appointmentData = await appointmentModel.aggregate([
            {
                $addFields: {
                    appointmentDateTime: {
                        $dateFromString: {
                            dateString: {
                                $concat: ["$date", "T", "$time"]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    expertId: new mongoose.Types.ObjectId(expertId),
                    appointmentStatus: 'pending',
                    appointmentDateTime: { $gte: now }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        console.log("now: ", now)
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