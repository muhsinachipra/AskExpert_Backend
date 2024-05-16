export default interface IHashPassword {
    createHash(password: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}
