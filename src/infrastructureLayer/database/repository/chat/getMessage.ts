// backend\src\infrastructureLayer\database\repository\chat\getMessage.ts

import { IMessage } from "../../../../domainLayer/message";
import MessageModel from "../../model/message";

export const getMessage = async (
    conversationId: string,
    messageModel: typeof MessageModel
): Promise<IMessage[]> => {
    try {
        const messages = await messageModel.find({ conversationId });
        return messages;
    } catch (error) {
        throw error
    }
}