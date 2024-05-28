// backend\src\usecaseLayer\interface\services\IResponse.ts

import { IAdmin } from "../../../domainLayer/admin"
import { IUser } from "../../../domainLayer/user"

export interface IResponse<T = IUser | IUser[] | IAdmin | IAdmin[] | string> {
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


// export interface IUserResponse<T = IUser | IUser[] | string> {
//     status: number;
//     success: boolean;
//     message?: string;
//     data?: T;
//     token?: string
// }
