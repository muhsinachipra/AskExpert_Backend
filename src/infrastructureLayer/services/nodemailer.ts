import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/INodemailer";

class Nodemailer implements INodemailer {
    private otps: Map<string, string> = new Map();

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
            console.log('email, name ', email, name);
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
            console.log('this.otps ', this.otps);

            const mailOptions = {
                from: "muhsinachipra@gmail.com",
                to: email,
                subject: "Email Verification",
                html: `
                <body style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #333;">Hello ${name}, Welcome to <strong>AskExpert</strong>!</h2>
                        <p style="color: #555;">We are thrilled to have you on board. To get started, please verify your email address by using the OTP below:</p>
                    </div>
                    <div style="width: 75%; margin: 0 auto; background-color: #00255F; color: white; padding: 20px; font-size: 24px; text-align: center; border-radius: 5px;">
                        <strong>${otp}</strong>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="color: #555;">If you did not request this email, please ignore it.</p>
                        <p style="color: #555;">Thank you,<br><strong>AskExpert Team</strong></p>
                    </div>
                </div>
            </body>`,
            };

            await transporter.sendMail(mailOptions);
            return "Hey please check your email";
        } catch (error) {
            throw new Error(
                `Unable to send email verification email to ${email}: ${error}`
            );
        }
    }

    //to verfiy the otp for the email verification
    async verifyOTP(enteredOTP: string, email: string): Promise<boolean> {
        try {
            const expectedOTP = this.otps.get(email);
            if (expectedOTP === enteredOTP) {
                this.otps.delete(email);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Wrong otp");
        }
    }

    async sendForgotPasswordEmail(email: string, username: string, token: string): Promise<string> {
        console.log("--> infrastructureLayer\services\nodemailer.ts", email, username);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        const mailOptions = {
            from: "muhsinachipra@gmail.com",
            to: email,
            subject: "AskExpert Password Assistance",
            html: `
            <body style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #333;">Hello ${username}<br> We received a request to reset your password for your <strong>AskExpert</strong> account.</h2>
                    <p style="color: #555;">Please click on the link below to reset your password:</p>
                </div>
                <div style="width: 75%; margin: 0 auto; background-color: #00255F; color: white; padding: 20px; font-size: 24px; text-align: center; border-radius: 5px;">
                    <strong><a href="http://localhost:5000/resetpassword/${email}/${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></strong>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: #555;">If you did not request this change, please ignore this email.</p>
                    <p style="color: #555;">Thank you,<br><strong>AskExpert Team</strong></p>
                </div>
            </div>
            </body>
            `
        }

        await transporter.sendMail(mailOptions);
        return "success";
        // return "Hey please check your email";

    }
}

export default Nodemailer;
