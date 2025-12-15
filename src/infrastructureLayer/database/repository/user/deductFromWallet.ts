// backend\src\infrastructureLayer\database\repository\user\deductFromWallet.ts

import ErrorResponse from "../../../../usecaseLayer/handler/errorResponse";
import UserModel from "../../model/userModel";

export const deductFromWallet = async (
    userId: string,
    amount: number,
    userModel: typeof UserModel
) => {
    try {
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            throw ErrorResponse.notFound('User not found')
        }
        const walletAmount = Number(user.wallet) || 0;
        const amountToDeduct = Number(amount);
        if (walletAmount < amountToDeduct) {
            throw ErrorResponse.badRequest('Insufficient wallet balance');
        }
        user.wallet = walletAmount - amountToDeduct;
        await user.save();
    } catch (error) {
        throw error
    }
}