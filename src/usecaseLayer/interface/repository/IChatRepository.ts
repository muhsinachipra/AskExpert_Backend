// backend\src\usecaseLayer\interface\repository\IChatRepository.ts

import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import { MessageResponse } from "../services/IResponse";

export interface IChatRepository {
    createConversation(senderId: string, receiverId: string): Promise<IConversation>;
    getConversation(userId: string): Promise<IConversation[]>;
    findConversation(senderId: string, receiverId: string): Promise<IConversation | null>;
    createMessage(newMessage: IMessage): Promise<IMessage>;
    getMessage(conversationId: string): Promise<IMessage[]>;
    viewMessages(_id: string[]): Promise<string>;
    getUnReadMessages(id: string): Promise<MessageResponse | null>;
}