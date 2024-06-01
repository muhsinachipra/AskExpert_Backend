// backend\src\usecaseLayer\interface\services\IResponse.ts

import { IAdmin } from "../../../domainLayer/admin"
import { IExpert } from "../../../domainLayer/expert"
import { IUser } from "../../../domainLayer/user"

export interface IResponse<T = IUser | IUser[] | IAdmin | IAdmin[] | IExpert | IExpert[] | string | null> {
    status: number
    success: boolean
    message?: string
    data?: T
    token?: string
}


export interface IResetPassword {
    id: string
    password: string;
}
