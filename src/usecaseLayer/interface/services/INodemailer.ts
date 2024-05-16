export default interface INodemailer {
    generateOTP(email: string): string;
    sentEmailVerification(email: string, username: string): Promise<string>
    sentMessageToEmail(email: string, fullName: string, status: string): Promise<string>
    verifyEmail(enteredOTP: string, email: string): Promise<boolean>
}
