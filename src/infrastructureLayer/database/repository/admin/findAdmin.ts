// backend\src\infrastructureLayer\database\repository\admin\findAdmin.ts

import AdminModel from "../../model/adminModel";

export const findAdmin = async (
    email: string,
    adminModel: typeof AdminModel
) => {
    try {
        const existingAdmin = await adminModel.findOne({ email });
        return existingAdmin;
    } catch (error) {
        throw error
    }
};