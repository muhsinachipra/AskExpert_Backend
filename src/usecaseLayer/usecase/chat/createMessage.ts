// backend\src\usecaseLayer\usecase\chat\createMessage.ts

import { IMessage } from "../../../domainLayer/message";
import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

// create new conversation
export const createMessage = async (
    requestValidator: IRequestValidator,
    chatRepository: IChatRepository,
    conversationId: string,
    senderId: string,
    receiverId: string,
    text: string
): Promise<IMessage> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { conversationId, senderId, receiverId, text },
            ["conversationId", "senderId", "receiverId", "text"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        console.log('conversationid in createMessage: ', conversationId);

        const newMessage = {
            conversationId,
            senderId,
            receiverId,
            text
        }
        const createNewMessage = await chatRepository.createMessage(newMessage);
        return createNewMessage

    } catch (err) {
        throw err;
    }
};
