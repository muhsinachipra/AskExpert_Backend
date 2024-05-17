import { IUser } from "../../../domainLayer/user"

export interface Response<T = IUser | IUser[] | string> {
    status: number
    success: boolean
    message?: string
    data?: T
}


export interface IForgetPassword {
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
