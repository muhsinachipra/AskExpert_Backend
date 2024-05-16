export interface IUser{
    _id?: string
    name: string
    email: string;
    mobile: string;
    password: string;
    isBlocked?: boolean;
    createdAt?:Date
}