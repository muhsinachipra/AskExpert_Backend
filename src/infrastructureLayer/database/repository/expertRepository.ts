// backend\src\infrastructureLayer\database\repository\expertRepository.ts

import { IExpert } from "../../../domainLayer/expert";
import { IExpertRepository } from "../../../usecaseLayer/interface/repository/IExpertRepository";
// import { IResetPassword } from "../../../usecaseLayer/interface/services/IResponse";
import ExpertModel from "../model/expertModel";
import { createExpert } from "./expert/createExpert";
// import { findExpert } from "./expert/findExpert";
// import { resetPassword } from "./expert/resetPassword";

export class ExpertRepository implements IExpertRepository {

    constructor(private readonly expertModel: typeof ExpertModel) { }

    async createExpert(newExpert: IExpert): Promise<IExpert> {
        return createExpert(newExpert, this.expertModel)
    }

    // async findExpert(email: string): Promise<IExpert | null> {
    //     return findExpert(email, this.expertModel)
    // }

    // async resetPassword(newPassword: IResetPassword): Promise<IExpert> {
    //     return resetPassword(newPassword, this.expertModel);
    // }
}