// backend\src\usecaseLayer\usecase\chat\getConversation.ts

import { IConversation } from "../../../domainLayer/conversation";
import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const getConversation = async (
    requestValidator: IRequestValidator,
    chatRepository: IChatRepository,
    userId: string
): Promise<IConversation[]> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { userId },
            ["userId",]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const conversations = await chatRepository.getConversation(userId);
        return conversations
    } catch (err) {
        throw err;
    }
};