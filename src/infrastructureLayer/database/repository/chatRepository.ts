// backend\src\infrastructureLayer\database\repository\chatRepository.ts

import { IMessage } from "../../../domainLayer/message";
import { IChatRepository } from "../../../usecaseLayer/interface/repository/IChatRepository";
import { IConversationData } from "../../../usecaseLayer/interface/services/IResponse";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import { createConversation } from "./chat/createConversation";
import { findConversation } from "./chat/findConversation";
// import { createMessage } from "./chat/createMessage";
// import { getMessage } from "./chat/getMessage";
// import { getUnReadMessages } from "./chat/getUnReadMessages";
// import { viewMessages } from "./chat/viewMessages";

// This class for exporting all the single DB operations togethor
export class ChatRepository implements IChatRepository {
    constructor(
        private readonly conversationModel: typeof ConversationModel,
        private readonly messageModel: typeof MessageModel
    ) { }

    // Create new conversation
    async createConversation(
        senderId: string,
        receiverId: string
    ): Promise<string> {
        return createConversation(senderId, receiverId, this.conversationModel);
    }

    // Check if a conversation exists using email
    async findConversation(
        senderId: string,
        receiverId: string
    ): Promise<IConversationData | undefined> {
        return findConversation(senderId, receiverId, this.conversationModel);
    }

    // // Create new message
    // async createMessage(newMessage: IMessage): Promise<IMessage> {
    //     return createMessage(newMessage, this.messageModel);
    // }

    // // get all messages
    // async getMessage(conversationId: string): Promise<MessageResponse | null> {
    //     return getMessage(conversationId, this.messageModel);
    // }

    // // get all un read messages
    // async getUnReadMessages(id: string): Promise<MessageResponse | null> {
    //     return getUnReadMessages(id, this.messageModel);
    // }

    // // get all message
    // async viewMessages(_id: string[]): Promise<string> {
    //     return viewMessages(_id, this.messageModel);
    // }

}
