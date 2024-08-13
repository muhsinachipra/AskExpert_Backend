// backend\src\usecaseLayer\interface\services\INodemailer.ts

export default interface INodemailer {
    generateOTP(email: string): string;
    sendEmailVerification(email: string, username: string): Promise<string>
    sendVerifiedEmail(email: string, username: string): Promise<string>
    verifyOTP(enteredOTP: string, email: string): Promise<boolean>
    sendForgotPasswordEmail(route: string, email: string, username: string, token: string): Promise<string>;
}
