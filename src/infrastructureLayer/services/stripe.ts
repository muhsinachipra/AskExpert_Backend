// backend\src\infrastructureLayer\services\stripe.ts

import IStripe from "../../usecaseLayer/interface/services/IStripe";
import { IResponse } from "../../usecaseLayer/interface/services/IResponse";

import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
    apiVersion: "2024-06-20"
});

class StripeService implements IStripe {

    async createPaymentIntent(
        amount: number,
        appointmentId: string,
        userId: string,
        userName: string
    ): Promise<IResponse> {

        console.log('inside createPaymentIntent stripe service', amount, appointmentId, 'userId : ', userId)

        const BASE_URL = process.env.BASE_URL as string;
        const successUrl = `${BASE_URL}/success`;
        const cancelUrl = `${BASE_URL}/home`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Service Payment is',
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                amount,
                appointmentId,
                userId,
                userName
            },
        });
        return {
            success: true,
            status: 200,
            data: session.id
        }
    }

}

export default StripeService
