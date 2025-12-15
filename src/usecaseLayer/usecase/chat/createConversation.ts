// backend\src\usecaseLayer\usecase\chat\createConversation.ts

import { IConversation } from "../../../domainLayer/conversation";
import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { ConversationResponse } from "../../interface/services/IResponse";

// create new conversation
export const createConversation = async (
    requestValidator: IRequestValidator,
    chatRepository: IChatRepository,
    senderId: string,
    receiverId: string

): Promise<IConversation> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { senderId, receiverId },
            ["receiverId", "receiverId"]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const conversation = await chatRepository.findConversation(senderId, receiverId); // checking if the service exist or not
        if (!conversation) {
            const createnewConversation = await chatRepository.createConversation(senderId, receiverId);
            return createnewConversation
        }

        return conversation;
    } catch (err) {
        throw err;
    }
};
