// backend\src\domainLayer\user.ts

export interface IUser{
    _id?: string
    name: string
    email: string;
    mobile?: string;
    profilePic: string;
    wallet?: number;
    password: string;
    isBlocked?: boolean;
    createdAt?:Date
}
