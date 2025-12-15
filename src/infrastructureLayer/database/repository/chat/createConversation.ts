// backend\src\infrastructureLayer\database\repository\chat\createConversation.ts

import { IConversation } from "../../../../domainLayer/conversation";
import ConversationModel from "../../model/conversation";

// Creating new user
export const createConversation = async (
    senderId: string,
    receiverId: string,
    conversationModel: typeof ConversationModel
): Promise<IConversation> => {
    try {
        const newConversation = await conversationModel.create({
            members: [senderId, receiverId],
        });
        await newConversation.save()
        return newConversation;
    } catch (error) {
        throw error
    }
}