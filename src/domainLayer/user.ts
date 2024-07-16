// backend\src\domainLayer\user.ts

export interface IUser{
    _id?: string
    name: string
    email: string;
    mobile?: string;
    password: string;
    isBlocked?: boolean;
    // refreshToken?: string[]
    createdAt?:Date
}