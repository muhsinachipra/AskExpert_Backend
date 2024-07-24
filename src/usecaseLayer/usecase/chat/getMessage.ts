// backend\src\usecaseLayer\usecase\chat\getMessage.ts

import { IMessage } from "../../../domainLayer/message";
import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";

export const getMessage = async (
    requestValidator: IRequestValidator,
    chatRepository: IChatRepository,
    conversationId: string

): Promise<IMessage[]> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            { conversationId },
            ["conversationId",]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const message = await chatRepository.getMessage(conversationId);
        return message
    } catch (err) {
        throw err;
    }
};
