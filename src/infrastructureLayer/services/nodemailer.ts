// backend\src\infrastructureLayer\services\nodemailer.ts

import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/INodemailer";

class Nodemailer implements INodemailer {
    private otps: Map<string, { otp: string, timestamp: number }> = new Map();
    private OTP_EXPIRATION_TIME = 1 * 60 * 1000; // 5 minutes

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
            // console.log('email and name in sendEmailVerification method', email, name);
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

            // console.log('before clearing this.otps in the sendEmailVerification method', this.otps);
            if (this.otps) {
                this.otps.clear();
            }
            const otp = this.generateOTP();
            const timestamp = Date.now();
            this.otps.set(email, { otp, timestamp });
            // console.log('after setting this.otps in the sendEmailVerification method', this.otps);

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

    async verifyOTP(enteredOTP: string, email: string): Promise<boolean> {
        try {
            console.log('this.otps in the verifyOTP method', this.otps);
            const otpData = this.otps.get(email);
            if (!otpData) {
                return false;
            }
            const { otp, timestamp } = otpData;
            const currentTime = Date.now();

            if (currentTime - timestamp > this.OTP_EXPIRATION_TIME) {
                this.otps.delete(email);
                return false; // OTP expired
            }

            // console.log("expectedOTP, enteredOTP ", otp, enteredOTP);
            if (otp === enteredOTP) {
                this.otps.delete(email);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Wrong otp");
        }
    }

    async sendForgotPasswordEmail(route: string, email: string, username: string, token: string): Promise<string> {
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
                    <strong><a href="http://localhost:5000${route}/resetpassword/${email}/${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></strong>
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

    async sendVerifiedEmail(email: string, name: string): Promise<string> {
        try {
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

            const mailOptions = {
                from: "muhsinachipra@gmail.com",
                to: email,
                subject: "Application for Becoming Expert Accepted",
                html: `
                <body style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #333;">Hello ${name}, Welcome to <strong>AskExpert</strong>!</h2>
                        <p style="color: #555;">We are thrilled to have you on board. Your application for becoming an expert has been accepted.</p>
                    </div>
                    <div style="width: 75%; margin: 0 auto; background-color: #00255F; color: white; padding: 20px; font-size: 24px; text-align: center; border-radius: 5px;">
                        <strong><a href="http://localhost:5000/expert/home" style="color: #007bff; text-decoration: none;">Welcome Onboard</a></strong>
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
}

export default Nodemailer;
