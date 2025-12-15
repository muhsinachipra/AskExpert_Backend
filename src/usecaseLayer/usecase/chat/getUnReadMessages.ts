// backend\src\usecaseLayer\usecase\chat\getUnReadMessages.ts

import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidateRepository";
import { MessageResponse } from "../../interface/services/IResponse";


// create new conversation
export const getUnReadMessages = async (
    requestValidator: IRequestValidator,
    chatRepository: IChatRepository,
    id: string

): Promise<MessageResponse | null> => {
    try {
        // Validate required parameters
        const validation = requestValidator.validateRequiredFields(
            { id },
            ["id",]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const message = await chatRepository.getUnReadMessages(id);
        if (message) {
            return message
        }
        return null
    } catch (err) {
        throw err;
    }
};
