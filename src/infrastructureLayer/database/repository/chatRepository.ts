// backend\src\infrastructureLayer\database\repository\chatRepository.ts

import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import { IChatRepository } from "../../../usecaseLayer/interface/repository/IChatRepository";
import { ConversationResponse, IConversationData, MessageResponse } from "../../../usecaseLayer/interface/services/IResponse";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { findConversation } from "./chat/findConversation";
import { getConversation } from "./chat/getConversation";
import { getMessage } from "./chat/getMessage";
import { getUnReadMessages } from "./chat/getUnReadMessages";
import { viewMessages } from "./chat/viewMessages";

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
    ): Promise<IConversation> {
        return createConversation(senderId, receiverId, this.conversationModel);
    }

    // get all coversations of the user
    async getConversation(userId: string): Promise<IConversation[]> {
        return getConversation(userId, this.conversationModel);
    }

    // Check if a conversation exists using email
    async findConversation(
        senderId: string,
        receiverId: string
    ): Promise<IConversation | null> {
        return findConversation(senderId, receiverId, this.conversationModel);
    }

    // Create new message
    async createMessage(newMessage: IMessage): Promise<IMessage> {
        return createMessage(newMessage, this.messageModel);
    }

    // get all messages
    async getMessage(conversationId: string): Promise<IMessage[]> {
        return getMessage(conversationId, this.messageModel);
    }

    async viewMessages(_id: string[]): Promise<string> {
        return viewMessages(_id, this.messageModel);
    }

    // get all un read messages
    async getUnReadMessages(id: string): Promise<MessageResponse | null> {
        return getUnReadMessages(id, this.messageModel);
    }

}
