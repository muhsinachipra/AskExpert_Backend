// backend\src\usecaseLayer\interface\services\IResponse.ts

import { IAdmin } from "../../../domainLayer/admin"
import { IAppointment } from "../../../domainLayer/appointment"
import { ICategory } from "../../../domainLayer/category"
import { IExpert } from "../../../domainLayer/expert"
import { IMessage } from "../../../domainLayer/message"
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

export interface IConversationData {
    _id: string;
    members: string[];
    user: string,
    userEmail: string,
    user_profile: string,
    expert: string,
    expert_profile: string
}

export interface ConversationResponse<T = IConversationData | IConversationData[] | string> {
    status: number;
    success: boolean;
    message?: string;
    data?: T;
}

export interface MessageResponse<T = IMessage | IMessage[] | string> {
    status: number;
    success: boolean;
    message?: string;
    data?: T;
}
