// backend\src\usecaseLayer\interface\services\IStripe.ts

import { IResponse } from "./IResponse";

interface IStripe {
    createPaymentIntent(amount: number, appointmentId: string, userId: string, userName: string): Promise<IResponse>
}

export default IStripe