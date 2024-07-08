// backend\src\usecaseLayer\usecase\appointment\createPayment.ts

import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { IResponse } from "../../interface/services/IResponse";
import IStripe from "../../interface/services/IStripe";

export const createPayment = async (
    stripe: IStripe,
    amount: number,
    appointmentId: string,
    userId: string,
    userName: string,
    requestValidator: IRequestValidator,
): Promise<IResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { amount, userId, userName, appointmentId },
            ["amount", "userId", 'userName', "appointmentId"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const res = await stripe.createPaymentIntent(amount, appointmentId, userId, userName);

        if (res) {
            return {
                status: 200,
                success: true,
                message: 'created',
                data: res.data
            }
        }
        throw ErrorResponse.badRequest("Payment creation Failed");
    } catch (err) {
        console.log(err);
        throw err;
    }
}

