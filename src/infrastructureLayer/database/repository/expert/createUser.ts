// backend\src\infrastructureLayer\database\reposittory\expert\createExpert.ts 

import { IExpert } from '../../../../domainLayer/expert'
import ExpertModel from '../../model/expertModel'

export const createExpert = async (
    newExpert: IExpert,
    expertModels: typeof ExpertModel
): Promise<IExpert> => {
    try {
        const expert = await expertModels.create(newExpert)
        await expert.save()
        return expert
    } catch (error) {
        throw error
    }
}