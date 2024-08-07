// backend\src\infrastructureLayer\database\repository\userRepository.ts

import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../../usecaseLayer/handler/errorResponse";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { deductFromWallet } from "./user/deductFromWallet";
import { findUser } from "./user/findUser";
import { findUserById } from "./user/findUserById";
import { getUserData } from "./user/getUserData";
import { resetPassword } from "./user/resetPassword";
import { updateProfile } from "./user/updateProfile";
import { updateUserBlockedStatus } from "./user/updateUserBlockedStatus";

export class UserRepository implements IUserRepository {

    constructor(private readonly userModel: typeof UserModel) { }

    async createUser(newUser: IUser): Promise<IUser> {
        return createUser(newUser, this.userModel)
    }

    async findUser(email: string): Promise<IUser | null> {
        return findUser(email, this.userModel)
    }

    async resetPassword(newPassword: IResetPassword): Promise<IUser> {
        return resetPassword(newPassword, this.userModel);
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return findUserById(userId, this.userModel);
    }

    async updateProfile(data: Record<string, string>): Promise<IUser | never> {
        return updateProfile(data, this.userModel)
    }

    async getUserData(page: number, limit: number): Promise<{ data: IUser[], total: number }> {
        return getUserData(page, limit, this.userModel);
    }

    async updateUserBlockedStatus(userId: string): Promise<IUser | null> {
        return updateUserBlockedStatus(userId, this.userModel);
    }

    async amountToWallet(userId: string, amount: number): Promise<string | null> {
        try {
            const user = await this.userModel.findOne({ _id: userId });
            if (user) {
                const walletAmount = Number(user.wallet) || 0;
                const amountToAdd = Number(amount);
                user.wallet = walletAmount + amountToAdd;
                await user.save();
                return "Amount added to wallet successfully";
            }
            return null;
        } catch (error) {
            console.error('Error adding amount to wallet:', error);
            return null;
        }
    }

    async deductFromWallet(userId: string, amount: number): Promise<void> {
        return deductFromWallet(userId, amount, this.userModel);
    }

    async getUserStatistics() {
        try {
            const totalUsers = await this.userModel.countDocuments();
            const activeUsers = await this.userModel.countDocuments({ isBlocked: false });
            const blockedUsers = await this.userModel.countDocuments({ isBlocked: true });
            return { totalUsers, activeUsers, blockedUsers };
        } catch (error) {
            console.error('Error getting user statistics:', error);
            throw error;
        }
    }

    async userCount() {
        try {
            const yearlyData = await this.userModel.aggregate([
                {
                    $group: {
                        _id: { year: { $year: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1 }
                }
            ]);
            const monthlyData = await this.userModel.aggregate([
                {
                    $group: {
                        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ]);
            const weeklyData = await this.userModel.aggregate([
                {
                    $group: {
                        _id: { year: { $year: "$createdAt" }, week: { $week: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.week": 1 }
                }
            ]);

            return { yearlyData, monthlyData, weeklyData }
        } catch (error) {
            console.error('Error getting userCount:', error);
            throw error;
        }
    }
}
