// backend\src\infrastructureLayer\database\repository\chat\createMessage.ts

import { IMessage } from "../../../../domainLayer/message";
import MessageModel from "../../model/message";

export const createMessage = async (
    newMessage: IMessage,
    messageModel: typeof MessageModel
): Promise<IMessage> => {
    try {
        console.log('newMessage in createMessage: ', newMessage)
        const message = await messageModel.create(newMessage);
        await message.save()
        return message;
    } catch (error) {
        throw error
    }
}