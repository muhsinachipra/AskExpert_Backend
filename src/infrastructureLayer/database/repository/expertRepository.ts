// backend\src\infrastructureLayer\database\repository\expertRepository.ts

import { IExpert } from "../../../domainLayer/expert";
import { IExpertRepository } from "../../../usecaseLayer/interface/repository/IExpertRepository";
import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
// import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
import ExpertModel from "../model/expertModel";
import { createExpert } from "./expert/createExpert";
import { findExpert } from "./expert/findExpert";
import { findExpertById } from "./expert/findExpertById";
import { getExpertData } from "./expert/getExpertData";
import { getExpertsByCategory } from "./expert/getExpertsByCategory";
import { resetPassword } from "./expert/resetPassword";
import { toggleExpertVerification } from "./expert/toggleExpertVerification";
import { updateProfile } from "./expert/updateProfile";
// import { resetPassword } from "./expert/resetPassword";

export class ExpertRepository implements IExpertRepository {

    constructor(private readonly expertModel: typeof ExpertModel) { }

    async createExpert(newExpert: IExpert): Promise<IExpert> {
        return createExpert(newExpert, this.expertModel)
    }

    async findExpert(email: string): Promise<IExpert | null> {
        return findExpert(email, this.expertModel)
    }

    async updateProfile(data: { _id: string; profilePic: string; name: string; rate: number; experience: number }): Promise<IExpert | never> {
        return updateProfile(data, this.expertModel)
    }

    async resetPassword(newPassword: IResetPassword): Promise<IExpert> {
        return resetPassword(newPassword, this.expertModel);
    }

    async findExpertById(expertId: string): Promise<IExpert | null> {
        return findExpertById(expertId, this.expertModel);
    }

    // async resetPassword(newPassword: IResetPassword): Promise<IExpert> {
    //     return resetPassword(newPassword, this.expertModel);
    // }

    async getExpertData(page: number, limit: number): Promise<{ data: IExpert[], total: number }> {
        return getExpertData(page, limit, this.expertModel);
    }

    async toggleExpertVerification(expertId: string): Promise<IExpert | null> {
        return toggleExpertVerification(expertId, this.expertModel);
    }

    async getExpertsByCategory(categoryName: string): Promise<{ data: IExpert[], total: number }> {
        return getExpertsByCategory(categoryName, this.expertModel);
    }

    async amountToWallet(expertId: string, amount: number): Promise<string | null> {
        try {
            const expert = await this.expertModel.findOne({ _id: expertId });
            if (expert) {
                expert.wallet = (expert.wallet || 0) + amount;
                await expert.save();
                return "Amount added to wallet successfully";
            }
            return null;
        } catch (error) {
            console.error('Error adding amount to wallet:', error);
            return null;
        }
    }

}