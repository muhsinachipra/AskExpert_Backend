// backend\src\usecaseLayer\usecase\chat\viewMessages.ts

import { IChatRepository } from "../../interface/repository/IChatRepository";

// create new conversation
export const viewMessages = async (
    chatRepository: IChatRepository,
    _id: string[]
): Promise<string> => {
    try {
        console.log(_id, " : _id in viewMessages");
        const updateStatus = await chatRepository.viewMessages(_id)
        return updateStatus
    } catch (err) {
        throw err;
    }
};
