import { IUser } from "../../../domainLayer/user"

export interface IResponse<T = IUser | IUser[] | string> {
    status: number
    success: boolean
    message?: string
    data?: T
    token?: string
}


export interface IForgotPassword {
    email: string
    password: string
}

export interface IUserResponse<T = IUser | IUser[] | string> {
    status: number;
    success: boolean;
    message?: string;
    data?: T;
    token?: string
}
