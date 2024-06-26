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
}