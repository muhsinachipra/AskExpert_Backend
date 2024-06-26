// backend\src\usecaseLayer\interface\services\IResponse.ts

import { IAdmin } from "../../../domainLayer/admin"
import { IAppointment } from "../../../domainLayer/appointment"
import { ICategory } from "../../../domainLayer/category"
import { IExpert } from "../../../domainLayer/expert"
import { IUser } from "../../../domainLayer/user"

export interface IResponse<T = IUser | IUser[] | IAdmin | IAdmin[] | IExpert | IExpert[] | ICategory | ICategory[] | IAppointment | IAppointment[] | Record<string, any> | string | null> {
    status: number
    success: boolean
    message?: string
    data?: T
    total?: number
    token?: string
}


export interface IResetPassword {
    id: string
    password: string;
}
