import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import { UserUsecase } from '../usecaseLayer/usecase/userUsecase'


export class UserAdapter {
    private readonly userUsecase: UserUsecase

    constructor(userUsecase: UserUsecase) {
        this.userUsecase = userUsecase
    }

    async createUser(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.createUser(req.body)
            newUser &&
                res.status(newUser.status).json({
                    success: newUser.success,
                    message: newUser.message
                })
        } catch (error) {
            next(error)
        }
    }
}