// backend\src\infrastructureLayer\database\repository\chat\getConversation.ts

import { IConversation } from "../../../../domainLayer/conversation";
import ConversationModel from "../../model/conversation";

export const getConversation = async (
    userId: string,
    conversationModel: typeof ConversationModel
): Promise<IConversation[]> => {
    try {
        // Get all the conversations with the userId in the members array
        const conversations = await conversationModel.find({
            members: userId
        });

        // console.log('conversation data in the getConversation repo: ', conversations)

        return conversations;

    } catch (error) {
        throw error
    }
}