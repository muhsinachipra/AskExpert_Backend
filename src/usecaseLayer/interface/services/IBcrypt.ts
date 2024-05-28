// backend\src\usecaseLayer\interface\services\IBcrypt.ts

export default interface IBcrypt {
    createHash(password: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}
