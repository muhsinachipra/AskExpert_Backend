import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/INodemailer";

class Nodemailer implements INodemailer {
    private otps: Map<string, string> = new Map();
    private startWorkOtp: Map<string, string> = new Map();

    generateOTP(): string {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    async sendEmailVerification(email: string, name: string): Promise<string> {
        try {
            console.log(email, name);
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            if (this.otps) {
                this.otps.clear();
            }
            const otp = this.generateOTP();
            this.otps.set(email, otp);
            console.log(this.otps);

            const mailOptions = {
                from: "testingjobee007@gmail.com",
                to: email,
                subject: "Email Verification",
                html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2>Hello ${name}, Welcome to <strong>AskExpert</strong>!</h2>
            <p>We are excited to have you on board. To get started, please verify your email address:</p>
          </div>
          <div style="width: 75%; margin: 0 auto; background-color: #00255F; color: white; padding: 4px; font-size: 3rem; text-align: center; border-radius: 5px;">
            <strong>${otp}</strong>
          </div>
        </div>
      </body>
      `,
            };

            await transporter.sendMail(mailOptions);
            return "Hey please check your email";
        } catch (error) {
            throw new Error(
                `Unable to send email verification email to ${email}: ${error}`
            );
        }
    }

    //to verfiy the email to check if it is crct or not
    async verifyEmail(enteredOTP: string, email: string): Promise<boolean> {
        try {
            const expectedOTP = this.startWorkOtp.get(email);
            if (expectedOTP === enteredOTP) {
                this.startWorkOtp.delete(email);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Wrong otp");
        }
    }
}

export default Nodemailer;
