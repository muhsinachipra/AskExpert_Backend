// backend\src\usecaseLayer\interface\services\IStripe.ts

import { Req } from "../../../infrastructureLayer/types/expressTypes";
import { IResponse } from "./IResponse";

interface IStripe {
    createPaymentIntent(amount: number, appointmentId: string, userId: string): Promise<IResponse>
}

export default IStripe