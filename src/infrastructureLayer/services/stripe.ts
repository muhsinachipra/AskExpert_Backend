// backend\src\infrastructureLayer\services\stripe.ts

import IStripe from "../../usecaseLayer/interface/services/IStripe";
import { IResponse } from "../../usecaseLayer/interface/services/IResponse";
import { Req } from "../types/expressTypes";

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
    ): Promise<IResponse> {

        console.log('inside createPaymentIntent stripe.ts', amount, appointmentId)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Service Payment is',
                            // images:["https://raw.githubusercontent.com/muhsinachipra/AskExpert_Frontend/146f8c02bb33babdf65a13943d940f5c2bfe9def/public/Ask.svg"]
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5000/success',
            cancel_url: 'http://localhost:5000',
            metadata: {
                amount,
                appointmentId,
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